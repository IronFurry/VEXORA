const Appointment = require("../models/Appointment");
const Service = require("../models/Service");
const Customer = require("../models/Customer");
const Staff = require("../models/Staff");
const Payment = require("../models/Payment");
const ApiError = require("../utils/apiError");
const { sendSuccess } = require("../utils/apiResponse");

/** GET /api/appointments?date=2026-09-08&status=confirmed */
const getAppointments = async (req, res, next) => {
  try {
    const { salonId } = req.manager;
    const filter = { salonId };

    if (req.query.date) {
      const d = new Date(req.query.date);
      const start = new Date(d); start.setHours(0, 0, 0, 0);
      const end = new Date(d); end.setHours(23, 59, 59, 999);
      filter.appointmentDate = { $gte: start, $lte: end };
    }

    if (req.query.status) filter.status = req.query.status;
    if (req.query.staffId) filter.staffId = req.query.staffId;
    if (req.query.customerId) filter.customerId = req.query.customerId;

    const appointments = await Appointment.find(filter)
      .sort({ appointmentDate: -1, createdAt: -1 })
      .limit(parseInt(req.query.limit) || 100);

    const customerIds = [...new Set(appointments.map((a) => a.customerId).filter(Boolean))];
    const serviceIds = [...new Set(appointments.map((a) => a.serviceId).filter(Boolean))];
    const staffIds = [...new Set(appointments.map((a) => a.staffId).filter(Boolean))];

    const [customers, services, staffMembers] = await Promise.all([
      Customer.find({ customerId: { $in: customerIds } }).select("customerId name phone"),
      Service.find({ serviceId: { $in: serviceIds } }).select("serviceId serviceName duration price"),
      Staff.find({ staffId: { $in: staffIds } }).select("staffId name"),
    ]);

    const customerMap = Object.fromEntries(customers.map((c) => [c.customerId, c]));
    const serviceMap = Object.fromEntries(services.map((s) => [s.serviceId, s]));
    const staffMap = Object.fromEntries(staffMembers.map((st) => [st.staffId, st.name]));

    const enrichedAppointments = appointments.map((a) => {
      const aObj = a.toObject();
      const cust = customerMap[a.customerId];
      const srv = serviceMap[a.serviceId];
      return {
        ...aObj,
        customerName: cust?.name || a.customerId,
        phone: cust?.phone || "",
        serviceName: srv?.serviceName || a.serviceId,
        staffName: staffMap[a.staffId] || a.staffId || "Any Stylist",
        duration: srv?.duration || 30,
      };
    });

    return sendSuccess(res, { appointments: enrichedAppointments, count: enrichedAppointments.length });
  } catch (err) {
    next(err);
  }
};

/** GET /api/appointments/:appointmentId */
const getAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findOne({
      appointmentId: req.params.appointmentId,
      salonId: req.manager.salonId
    });
    if (!appointment) throw new ApiError("Appointment not found.", 404);
    return sendSuccess(res, { appointment });
  } catch (err) {
    next(err);
  }
};

/** POST /api/appointments */
const createAppointment = async (req, res, next) => {
  try {
    const {
      customerId, serviceId, staffId, appointmentDate, startTime, endTime,
      bookingType, couponId
    } = req.body;

    if (!customerId || !serviceId || !appointmentDate || !startTime || !endTime) {
      throw new ApiError("customerId, serviceId, appointmentDate, startTime and endTime are required.", 400);
    }

    const service = await Service.findOne({ serviceId, salonId: req.manager.salonId });
    if (!service) throw new ApiError("Service not found in this salon.", 404);

    const count = await Appointment.countDocuments();
    const appointmentId = `APT-${String(count + 1).padStart(3, "0")}-${Date.now().toString().slice(-4)}`;

    const appointment = await Appointment.create({
      appointmentId,
      customerId,
      salonId: req.manager.salonId,
      serviceId,
      staffId: staffId || null,
      appointmentDate: new Date(appointmentDate),
      startTime,
      endTime,
      bookingType: bookingType || "appointment",
      price: service.price,
      couponId: couponId || null,
      status: "confirmed"
    });

    return sendSuccess(res, { appointment }, "Appointment created.", 201);
  } catch (err) {
    next(err);
  }
};

/** PATCH /api/appointments/:appointmentId/status */
const updateAppointmentStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ["confirmed", "checked_in", "waiting", "in_service", "completed", "cancelled", "no_show"];
    if (!validStatuses.includes(status)) {
      throw new ApiError(`Invalid status. Must be one of: ${validStatuses.join(", ")}`, 400);
    }

    const appointment = await Appointment.findOneAndUpdate(
      { appointmentId: req.params.appointmentId, salonId: req.manager.salonId },
      { $set: { status } },
      { new: true }
    );

    if (!appointment) throw new ApiError("Appointment not found.", 404);

    if (status === "completed") {
      try {
        let payment = await Payment.findOne({ appointmentId: appointment.appointmentId });
        if (!payment) {
          const pCount = await Payment.countDocuments();
          const paymentId = `PAY-${String(pCount + 1).padStart(3, "0")}-${Date.now().toString().slice(-4)}`;
          payment = await Payment.create({
            paymentId,
            appointmentId: appointment.appointmentId,
            customerId: appointment.customerId || "CUST-WALKIN",
            salonId: req.manager.salonId,
            amount: appointment.price || 450,
            paymentGateway: "cash",
            paymentMethod: "cash",
            status: "paid",
            paymentTime: new Date(),
          });
          appointment.paymentId = paymentId;
          await appointment.save();
        }
      } catch (pErr) {
        console.warn("Could not auto-create payment on status completed:", pErr.message);
      }
    }

    return sendSuccess(res, { appointment }, `Appointment status updated to ${status}.`);
  } catch (err) {
    next(err);
  }
};

/** PATCH /api/appointments/:appointmentId */
const updateAppointment = async (req, res, next) => {
  try {
    const allowed = ["staffId", "appointmentDate", "startTime", "endTime", "status", "couponId", "paymentId", "checkIn", "queuePosition", "estimatedWaitTime"];
    const updates = {};
    allowed.forEach((f) => {
      if (req.body[f] !== undefined) updates[f] = req.body[f];
    });

    const appointment = await Appointment.findOneAndUpdate(
      { appointmentId: req.params.appointmentId, salonId: req.manager.salonId },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!appointment) throw new ApiError("Appointment not found.", 404);
    return sendSuccess(res, { appointment }, "Appointment updated.");
  } catch (err) {
    next(err);
  }
};

/** POST /api/appointments/:appointmentId/checkin */
const checkIn = async (req, res, next) => {
  try {
    const appointment = await Appointment.findOneAndUpdate(
      { appointmentId: req.params.appointmentId, salonId: req.manager.salonId },
      {
        $set: {
          "checkIn.status": "checked_in",
          "checkIn.checkedInAt": new Date(),
          "checkIn.checkedInBy": req.manager.managerId,
          status: "checked_in"
        }
      },
      { new: true }
    );

    if (!appointment) throw new ApiError("Appointment not found.", 404);
    return sendSuccess(res, { appointment }, "Customer checked in.");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAppointments, getAppointment, createAppointment,
  updateAppointment, updateAppointmentStatus, checkIn
};
