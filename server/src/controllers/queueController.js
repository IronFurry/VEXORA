const Appointment = require("../models/Appointment");
const Customer = require("../models/Customer");
const Salon = require("../models/Salon");
const Staff = require("../models/Staff");
const Service = require("../models/Service");
const Payment = require("../models/Payment");
const queueEngine = require("../services/queueEngine");
const notificationService = require("../services/notificationService");
const ApiError = require("../utils/apiError");
const { sendSuccess } = require("../utils/apiResponse");

/**
 * GET /api/queue
 * Returns today's active queue (walk-in + queue bookings) sorted by position.
 */
const getQueue = async (req, res, next) => {
  try {
    const { salonId } = req.manager;
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const queue = await Appointment.find({
      salonId,
      appointmentDate: { $gte: todayStart, $lte: todayEnd },
      status: { $in: ["confirmed", "checked_in", "waiting", "in_service"] },
    }).sort({ queuePosition: 1, startTime: 1 });

    const customerIds = [...new Set(queue.map((q) => q.customerId).filter(Boolean))];
    const serviceIds = [...new Set(queue.map((q) => q.serviceId).filter(Boolean))];
    const staffIds = [...new Set(queue.map((q) => q.staffId).filter(Boolean))];

    const [customers, services, staffMembers] = await Promise.all([
      Customer.find({ customerId: { $in: customerIds } }).select("customerId name phone"),
      Service.find({ serviceId: { $in: serviceIds } }).select("serviceId serviceName duration price"),
      Staff.find({ staffId: { $in: staffIds } }).select("staffId name"),
    ]);

    const customerMap = Object.fromEntries(customers.map((c) => [c.customerId, c]));
    const serviceMap = Object.fromEntries(services.map((s) => [s.serviceId, s]));
    const staffMap = Object.fromEntries(staffMembers.map((st) => [st.staffId, st.name]));

    const enrichedQueue = queue.map((q) => {
      const qObj = q.toObject();
      const cust = customerMap[q.customerId];
      const srv = serviceMap[q.serviceId];
      return {
        ...qObj,
        customerName: cust?.name || q.customerId,
        phone: cust?.phone || "",
        serviceName: srv?.serviceName || q.serviceId,
        staffName: staffMap[q.staffId] || q.staffId || "Any Stylist",
        duration: srv?.duration || 30,
      };
    });

    return sendSuccess(res, { queue: enrichedQueue, count: enrichedQueue.length });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/queue/join
 * Add a walk-in customer to the queue.
 */
const joinQueue = async (req, res, next) => {
  try {
    const { customerId, serviceId, staffId } = req.body;
    const { salonId } = req.manager;

    if (!customerId || !serviceId) {
      throw new ApiError("customerId and serviceId are required.", 400);
    }

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const lastInQueue = await Appointment.findOne({
      salonId,
      appointmentDate: { $gte: todayStart, $lte: todayEnd },
      status: { $in: ["waiting", "confirmed", "checked_in"] },
    }).sort({ queuePosition: -1 });

    const nextPosition = (lastInQueue?.queuePosition || 0) + 1;

    const service = await Service.findOne({ serviceId, salonId });
    const count = await Appointment.countDocuments();
    const appointmentId = `APT-Q${String(count + 1).padStart(3, "0")}-${Date.now().toString().slice(-4)}`;

    const now = new Date();
    const startTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    const duration = service?.duration || 30;
    const endDate = new Date(now.getTime() + duration * 60 * 1000);
    const endTime = `${String(endDate.getHours()).padStart(2, "0")}:${String(endDate.getMinutes()).padStart(2, "0")}`;

    const appointment = await Appointment.create({
      appointmentId,
      customerId,
      salonId,
      serviceId,
      staffId: staffId || null,
      appointmentDate: now,
      startTime,
      endTime,
      bookingType: "queue",
      queuePosition: nextPosition,
      estimatedWaitTime: Math.max(0, (nextPosition - 1) * duration),
      price: service?.price || 500,
      status: "waiting",
    });

    // Recalculate
    await queueEngine.recalculateQueue(salonId);

    // Emit Socket.IO
    const io = req.app.get("io");
    if (io) {
      io.to(`salon:${salonId}`).emit("queue:created", appointment);
      io.emit("queue:updated", { salonId, appointmentId: appointment.appointmentId });
    }

    return sendSuccess(res, { appointment, queuePosition: nextPosition }, "Added to queue.", 201);
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/queue/:appointmentId/start
 * Mark a queue entry as in_service.
 */
const startService = async (req, res, next) => {
  try {
    const { appointmentId } = req.params;
    const { salonId } = req.manager;

    const appointment = await Appointment.findOneAndUpdate(
      { appointmentId, salonId },
      {
        $set: {
          status: "in_service",
          "checkIn.status": "checked_in",
          "checkIn.checkedInAt": new Date(),
        },
      },
      { new: true }
    );

    if (!appointment) throw new ApiError("Queue entry not found.", 404);

    // Recalculate remaining wait times
    await queueEngine.recalculateQueue(salonId);

    // Notify customer via WhatsApp
    try {
      const customer = await Customer.findOne({ customerId: appointment.customerId });
      const salon = await Salon.findOne({ salonId });
      const staff = appointment.staffId ? await Staff.findOne({ staffId: appointment.staffId }) : null;

      if (customer?.phone) {
        await notificationService.sendServiceStarted({
          phone: customer.phone,
          customerName: customer.name,
          ticketNumber: appointment.appointmentId.split("-")[1] || "VXR-101",
          salonName: salon?.salonName || "Salon",
          stylistName: staff?.name || "Your Stylist",
        });
      }
    } catch (notifErr) {
      console.warn("Could not send service_started notification:", notifErr.message);
    }

    // Emit Socket.IO
    const io = req.app.get("io");
    if (io) {
      io.to(`salon:${salonId}`).emit("queue:started", { appointmentId, status: "in_service" });
      io.emit("queue:updated", { salonId, appointmentId, status: "in_service" });
    }

    return sendSuccess(res, { appointment }, "Service started.");
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/queue/:appointmentId/complete
 */
const completeService = async (req, res, next) => {
  try {
    const { appointmentId } = req.params;
    const { salonId } = req.manager;

    const appointment = await Appointment.findOneAndUpdate(
      { appointmentId, salonId },
      { $set: { status: "completed" } },
      { new: true }
    );

    if (!appointment) throw new ApiError("Queue entry not found.", 404);

    // Auto-record paid payment for revenue tracking
    try {
      let payment = await Payment.findOne({ appointmentId });
      if (!payment) {
        const pCount = await Payment.countDocuments();
        const paymentId = `PAY-${String(pCount + 1).padStart(3, "0")}-${Date.now().toString().slice(-4)}`;
        payment = await Payment.create({
          paymentId,
          appointmentId: appointment.appointmentId,
          customerId: appointment.customerId || "CUST-WALKIN",
          salonId,
          amount: appointment.price || 450,
          paymentGateway: "cash",
          paymentMethod: "cash",
          status: "paid",
          paymentTime: new Date(),
        });
        appointment.paymentId = paymentId;
        await appointment.save();
      }
    } catch (payErr) {
      console.warn("Could not auto-record payment on completeService:", payErr.message);
    }

    // Recalculate remaining positions & ETAs
    const updatedEntries = await queueEngine.recalculateQueue(salonId);

    // Send QUEUE_POSITION_2 notification to customer at position 2
    try {
      const pos2Entry = (updatedEntries || []).find((e) => e.queuePosition === 2);
      if (pos2Entry) {
        const userDoc = await Customer.findOne({ customerId: pos2Entry.customerId });
        const user = {
          phoneNumber: userDoc?.phone || "",
          name: userDoc?.name || "Customer",
        };
        const queuePosition = pos2Entry.queuePosition;
        const appointmentData = {
          time: pos2Entry.startTime || "10:00 AM",
        };

        if (queuePosition === 2) {
          try {
            await fetch(
              "http://192.168.137.34:5000/api/notifications/send",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  phoneNumber: user.phoneNumber,
                  type: "QUEUE_POSITION_2",
                  data: {
                    userName: user.name,
                    appointmentTime: appointmentData.time
                  }
                })
              }
            );
          } catch (error) {
            console.error(
              "Queue notification error:",
              error.message
            );
          }
        }
      }
    } catch (notifErr) {
      console.error("Queue notification lookup error:", notifErr.message);
    }

    // Emit Socket.IO
    const io = req.app.get("io");
    if (io) {
      io.to(`salon:${salonId}`).emit("queue:completed", { appointmentId, status: "completed" });
      io.emit("queue:updated", { salonId, appointmentId, status: "completed" });
    }

    return sendSuccess(res, { appointment }, "Service completed.");
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/queue/:appointmentId/cancel
 */
const cancelQueue = async (req, res, next) => {
  try {
    const { appointmentId } = req.params;
    const { salonId } = req.manager;

    const appointment = await Appointment.findOneAndUpdate(
      { appointmentId, salonId },
      { $set: { status: "cancelled" } },
      { new: true }
    );

    if (!appointment) throw new ApiError("Queue entry not found.", 404);

    // Recalculate remaining positions & ETAs
    await queueEngine.recalculateQueue(salonId);

    // Emit Socket.IO
    const io = req.app.get("io");
    if (io) {
      io.to(`salon:${salonId}`).emit("queue:cancelled", { appointmentId, status: "cancelled" });
      io.emit("queue:updated", { salonId, appointmentId, status: "cancelled" });
    }

    return sendSuccess(res, { appointment }, "Queue entry cancelled.");
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/queue/:appointmentId/move-up
 * Move customer one step higher in waiting queue
 */
const moveUpQueue = async (req, res, next) => {
  try {
    const { appointmentId } = req.params;
    const { salonId } = req.manager;

    const current = await Appointment.findOne({ appointmentId, salonId });
    if (!current) throw new ApiError("Queue entry not found.", 404);

    if (current.queuePosition <= 1) {
      return sendSuccess(res, { appointment: current }, "Customer is already first in line.");
    }

    // Find entry currently directly ahead
    const ahead = await Appointment.findOne({
      salonId,
      status: { $in: ["waiting", "confirmed"] },
      queuePosition: current.queuePosition - 1,
    });

    if (ahead) {
      const prevPos = current.queuePosition;
      current.queuePosition = ahead.queuePosition;
      ahead.queuePosition = prevPos;
      await ahead.save();
      await current.save();
    }

    // Recalculate
    await queueEngine.recalculateQueue(salonId);

    // Emit Socket.IO
    const io = req.app.get("io");
    if (io) {
      io.to(`salon:${salonId}`).emit("queue:updated", { salonId, appointmentId });
      io.emit("queue:updated", { salonId, appointmentId });
    }

    return sendSuccess(res, { appointment: current }, "Customer moved up.");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getQueue,
  joinQueue,
  startService,
  completeService,
  cancelQueue,
  moveUpQueue,
};
