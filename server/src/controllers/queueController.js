const Appointment = require("../models/Appointment");
const ApiError = require("../utils/apiError");
const { sendSuccess } = require("../utils/apiResponse");

/**
 * GET /api/queue
 * Returns today's active queue (walk-in + queue bookings) sorted by position.
 */
const getQueue = async (req, res, next) => {
  try {
    const { salonId } = req.manager;
    const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(); todayEnd.setHours(23, 59, 59, 999);

    const queue = await Appointment.find({
      salonId,
      appointmentDate: { $gte: todayStart, $lte: todayEnd },
      status: { $in: ["confirmed", "checked_in", "waiting", "in_service"] }
    }).sort({ queuePosition: 1, startTime: 1 });

    return sendSuccess(res, { queue, count: queue.length });
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

    // Find current last position
    const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(); todayEnd.setHours(23, 59, 59, 999);

    const lastInQueue = await Appointment.findOne({
      salonId,
      appointmentDate: { $gte: todayStart, $lte: todayEnd },
      status: { $in: ["waiting", "confirmed", "checked_in"] }
    }).sort({ queuePosition: -1 });

    const nextPosition = (lastInQueue?.queuePosition || 0) + 1;

    const Service = require("../models/Service");
    const service = await Service.findOne({ serviceId, salonId });
    if (!service) throw new ApiError("Service not found.", 404);

    const count = await Appointment.countDocuments();
    const appointmentId = `APT-Q${String(count + 1).padStart(3, "0")}-${Date.now().toString().slice(-4)}`;

    const now = new Date();
    const startTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    const endDate = new Date(now.getTime() + service.duration * 60 * 1000);
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
      estimatedWaitTime: (nextPosition - 1) * (service.duration || 30),
      price: service.price,
      status: "waiting"
    });

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
    const appointment = await Appointment.findOneAndUpdate(
      { appointmentId: req.params.appointmentId, salonId: req.manager.salonId },
      { $set: { status: "in_service", "checkIn.status": "checked_in", "checkIn.checkedInAt": new Date() } },
      { new: true }
    );
    if (!appointment) throw new ApiError("Queue entry not found.", 404);
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
    const appointment = await Appointment.findOneAndUpdate(
      { appointmentId: req.params.appointmentId, salonId: req.manager.salonId },
      { $set: { status: "completed" } },
      { new: true }
    );
    if (!appointment) throw new ApiError("Queue entry not found.", 404);
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
    const appointment = await Appointment.findOneAndUpdate(
      { appointmentId: req.params.appointmentId, salonId: req.manager.salonId },
      { $set: { status: "cancelled" } },
      { new: true }
    );
    if (!appointment) throw new ApiError("Queue entry not found.", 404);
    return sendSuccess(res, { appointment }, "Queue entry cancelled.");
  } catch (err) {
    next(err);
  }
};

module.exports = { getQueue, joinQueue, startService, completeService, cancelQueue };
