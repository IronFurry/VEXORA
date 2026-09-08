const mongoose = require("mongoose");
const Appointment = require("../models/Appointment");
const Customer = require("../models/Customer");
const Salon = require("../models/Salon");
const Service = require("../models/Service");
const Staff = require("../models/Staff");
const queueEngine = require("../services/queueEngine");
const notificationService = require("../services/notificationService");
const ApiError = require("../utils/apiError");
const { sendSuccess } = require("../utils/apiResponse");

/**
 * Format Arrive By time string
 */
function calculateArriveBy(waitMinutes) {
  const target = new Date(Date.now() + waitMinutes * 60000);
  let hours = target.getHours();
  const minutes = String(target.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
}

/**
 * POST /api/customer/bookings
 * Public customer booking endpoint creating appointment + digital queue ticket in MongoDB
 */
const createCustomerBooking = async (req, res, next) => {
  try {
    const {
      customerName,
      phone,
      customerPhone,
      salonId,
      serviceIds,
      preferredStylistId,
      customerCoords,
    } = req.body;

    const contactPhone = phone || customerPhone;

    if (!customerName || !contactPhone) {
      throw new ApiError("Customer name and phone number are required.", 400);
    }
    if (!salonId) {
      throw new ApiError("salonId is required.", 400);
    }
    if (!serviceIds || !Array.isArray(serviceIds) || !serviceIds.length) {
      throw new ApiError("At least one service must be selected.", 400);
    }

    // 1. Validate Salon
    const isObjectId = mongoose.Types.ObjectId.isValid(salonId);
    const salon = await Salon.findOne({
      $or: [
        { salonId },
        ...(isObjectId ? [{ _id: salonId }] : []),
        { salonName: new RegExp(salonId, "i") },
      ],
      status: "active",
    });
    if (!salon) {
      throw new ApiError("Salon not found or currently inactive.", 404);
    }

    // 2. Validate Services and Calculate Totals from MongoDB
    // Try matching by serviceId or category/serviceName for this salon or globally
    const services = await Service.find({
      $or: [
        { serviceId: { $in: serviceIds }, salonId: salon.salonId },
        { serviceId: { $in: serviceIds } },
        { category: { $in: serviceIds } },
      ],
      status: "active",
    });

    let totalPrice = 0;
    let totalDuration = 0;
    let serviceNames = "";

    if (services.length > 0) {
      totalPrice = services.reduce((sum, s) => sum + (s.price || 0), 0);
      totalDuration = services.reduce((sum, s) => sum + (s.duration || 30), 0);
      serviceNames = services.map((s) => s.serviceName).join(" + ");
    } else {
      // Fallback service pricing for standard catalog items
      const FALLBACK_PRICES = {
        haircut: { name: "Precision Haircut", price: 450, duration: 30 },
        beard: { name: "Beard Trim & Sculpting", price: 350, duration: 25 },
        facial: { name: "Executive Facial Therapy", price: 850, duration: 45 },
        color: { name: "Couture Hair Coloring", price: 1400, duration: 60 },
        spa: { name: "Nourishing Hair Spa", price: 1100, duration: 45 },
        styling: { name: "Texture & Blowdry Styling", price: 400, duration: 25 },
      };
      serviceIds.forEach((id) => {
        const item = FALLBACK_PRICES[id] || { name: id, price: 500, duration: 30 };
        totalPrice += item.price;
        totalDuration += item.duration;
        serviceNames = serviceNames ? `${serviceNames} + ${item.name}` : item.name;
      });
    }

    // 3. Resolve Stylist
    let stylist = null;
    if (preferredStylistId && preferredStylistId !== "any") {
      stylist = await Staff.findOne({
        salonId: salon.salonId,
        $or: [{ staffId: preferredStylistId }, { name: new RegExp(preferredStylistId, "i") }],
        status: "active",
      });
    }

    if (!stylist) {
      stylist = await queueEngine.autoAssignStylist(salon.salonId, serviceIds);
    }

    // 4. Find or Create Customer
    const cleanPhone = contactPhone.replace(/[^0-9+]/g, "");
    let customer = await Customer.findOne({ phone: cleanPhone });
    if (!customer) {
      const custCount = await Customer.countDocuments();
      customer = await Customer.create({
        customerId: `CUST-${String(custCount + 1).padStart(3, "0")}-${Date.now().toString().slice(-4)}`,
        name: customerName.trim(),
        phone: cleanPhone,
      });
    } else {
      customer.name = customerName.trim();
      await customer.save();
    }

    // 5. Determine Priority & Queue Position
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // Check customer loyalty score (past visits to this salon/stylist)
    const loyaltyScore = await queueEngine.getCustomerLoyaltyScore(
      customer.customerId,
      salon.salonId,
      stylist?.staffId
    );

    // Active queue entries today
    const activeEntries = await Appointment.find({
      salonId: salon.salonId,
      appointmentDate: { $gte: todayStart, $lte: todayEnd },
      status: { $in: ["waiting", "in_service"] },
    }).sort({ queuePosition: 1 });

    const activeCount = activeEntries.length;
    let queuePosition = activeCount + 1;

    // Priority bonus: if loyal customer (visits >= 3), they move ahead of same-window waitings if applicable
    if (loyaltyScore >= 3 && queuePosition > 2) {
      // Prioritize 1 step ahead (never preempt in-service)
      queuePosition = Math.max(2, queuePosition - 1);
    }

    // Calculate Estimated Wait Time
    const estimatedWaitTime = Math.max(8, activeCount * 18);
    const arriveBy = calculateArriveBy(estimatedWaitTime);

    // 6. Generate Ticket Number & Create MongoDB Appointment
    const randomTicketSuffix = Math.floor(100 + Math.random() * 900);
    const ticketNumber = `VXR-${randomTicketSuffix}`;
    const count = await Appointment.countDocuments();
    const appointmentId = `APT-${ticketNumber}-${Date.now().toString().slice(-4)}`;

    const now = new Date();
    const startTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    const endObj = new Date(now.getTime() + totalDuration * 60000);
    const endTime = `${String(endObj.getHours()).padStart(2, "0")}:${String(endObj.getMinutes()).padStart(2, "0")}`;

    const appointment = await Appointment.create({
      appointmentId,
      customerId: customer.customerId,
      salonId: salon.salonId,
      serviceId: services[0]?.serviceId || serviceIds[0] || "SRV-001",
      staffId: stylist?.staffId || null,
      appointmentDate: now,
      startTime,
      endTime,
      bookingType: "queue",
      queuePosition,
      estimatedWaitTime,
      price: totalPrice,
      status: "waiting",
    });

    // 7. Distance & Travel Time Calculation
    let distanceKm = null;
    let travelTimeMinutes = 10;
    if (customerCoords?.latitude && customerCoords?.longitude && salon.location?.coordinates) {
      distanceKm = queueEngine.calculateDistance(
        parseFloat(customerCoords.latitude),
        parseFloat(customerCoords.longitude),
        salon.location.coordinates[1], // latitude
        salon.location.coordinates[0]  // longitude
      );
      travelTimeMinutes = queueEngine.estimateTravelTime(distanceKm);
    }

    // 8. Trigger WhatsApp Notification
    await notificationService.sendBookingConfirmation({
      phone: cleanPhone,
      customerName: customer.name,
      ticketNumber,
      salonName: salon.salonName,
      stylistName: stylist?.name || "Next Available Stylist",
      serviceNames,
      etaMinutes: estimatedWaitTime,
      position: queuePosition,
    });

    // If wait time is already within travel time window, trigger travel reminder!
    if (distanceKm != null && estimatedWaitTime <= travelTimeMinutes + 5) {
      await notificationService.sendTravelReminder({
        phone: cleanPhone,
        customerName: customer.name,
        ticketNumber,
        salonName: salon.salonName,
        etaMinutes: estimatedWaitTime,
        travelTimeMinutes,
        distanceKm,
      });
    }

    // 9. Emit Socket.IO Event for Salon Dashboard & Live Sync
    const ticketData = {
      ticketNumber,
      appointmentId: appointment.appointmentId,
      customerId: customer.customerId,
      customerName: customer.name,
      phone: customer.phone,
      salonId: salon.salonId,
      salonName: salon.salonName,
      salonAddress: salon.location?.address || "Bengaluru",
      stylistId: stylist?.staffId || null,
      stylistName: stylist?.name || "Any Stylist",
      serviceIds,
      serviceNames,
      totalPrice,
      totalDuration,
      queuePosition,
      estimatedWaitTime,
      arriveBy,
      distanceKm: distanceKm || 0.8,
      travelTimeMinutes,
      status: "waiting",
      createdAt: appointment.createdAt,
    };

    const io = req.app.get("io");
    if (io) {
      io.to(`salon:${salon.salonId}`).emit("queue:created", ticketData);
      io.emit("queue:updated", { salonId: salon.salonId, ticket: ticketData });
    }

    const notifications = notificationService.getNotificationsByPhone(cleanPhone);

    return sendSuccess(
      res,
      {
        ticket: ticketData,
        appointment,
        notifications,
      },
      "Queue ticket created successfully.",
      201
    );
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/customer/tickets/:ticketId
 * Fetch live ticket position, ETA, and travel-time status
 */
const getTicketStatus = async (req, res, next) => {
  try {
    const { ticketId } = req.params;

    // Support both "VXR-519" (ticket number) and "APT-VXR-519-XXXX" (appointmentId)
    const isTicketNumber = /^VXR-\d+$/i.test(ticketId);
    const appointmentQuery = isTicketNumber
      ? { appointmentId: new RegExp(ticketId, "i") }
      : { $or: [{ appointmentId: ticketId }, { appointmentId: new RegExp(ticketId, "i") }] };

    const appointment = await Appointment.findOne(appointmentQuery).sort({ createdAt: -1 });

    if (!appointment) {
      throw new ApiError("Ticket not found.", 404);
    }

    const salon = await Salon.findOne({ salonId: appointment.salonId });
    const customer = await Customer.findOne({ customerId: appointment.customerId });
    const staff = appointment.staffId ? await Staff.findOne({ staffId: appointment.staffId }) : null;

    // Extract ticket number (e.g. APT-VXR-519-8289 -> VXR-519)
    const ticketNumMatch = appointment.appointmentId.match(/VXR-\d+/i);
    const ticketNumber = ticketNumMatch ? ticketNumMatch[0] : appointment.appointmentId;
    const arriveBy = calculateArriveBy(appointment.estimatedWaitTime || 15);
    const notifications = customer?.phone ? notificationService.getNotificationsByPhone(customer.phone) : [];

    const ticketData = {
      ticketNumber,
      appointmentId: appointment.appointmentId,
      customerId: appointment.customerId,
      customerName: customer?.name || "Guest Customer",
      phone: customer?.phone || "",
      salonId: appointment.salonId,
      salonName: salon?.salonName || "VEXORA Salon",
      salonAddress: salon?.location?.address || "",
      stylistId: appointment.staffId,
      stylistName: staff?.name || "Any Stylist",
      serviceNames: appointment.serviceId || "",
      totalPrice: appointment.price,
      totalDuration: appointment.estimatedWaitTime || 0,
      queuePosition: appointment.queuePosition || 1,
      estimatedWaitTime: appointment.estimatedWaitTime || 0,
      arriveBy,
      status: appointment.status,
      price: appointment.price,
      createdAt: appointment.createdAt,
    };

    // Fetch live queue for this salon (today, active entries only)
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const liveQueueRaw = await Appointment.find({
      salonId: appointment.salonId,
      appointmentDate: { $gte: todayStart, $lte: todayEnd },
      status: { $in: ["waiting", "in_service"] },
    }).sort({ queuePosition: 1 }).limit(20);

    const liveQueue = liveQueueRaw.map((a) => ({
      appointmentId: a.appointmentId,
      ticketNumber: a.appointmentId.split("-")[1] || a.appointmentId,
      queuePosition: a.queuePosition,
      status: a.status,
      estimatedWaitTime: a.estimatedWaitTime,
      staffId: a.staffId,
    }));

    return sendSuccess(res, { ticket: ticketData, notifications, liveQueue });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/customer/my-bookings?phone=...
 */
const getMyBookings = async (req, res, next) => {
  try {
    const { phone } = req.query;
    if (!phone) throw new ApiError("Phone number is required.", 400);

    const cleanPhone = phone.replace(/[^0-9+]/g, "");
    const customer = await Customer.findOne({ phone: cleanPhone });
    if (!customer) {
      return sendSuccess(res, { bookings: [], customer: null });
    }

    const appointments = await Appointment.find({ customerId: customer.customerId })
      .sort({ appointmentDate: -1 })
      .limit(20);

    const notifications = notificationService.getNotificationsByPhone(cleanPhone);

    return sendSuccess(res, { customer, bookings: appointments, notifications });
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/customer/tickets/:ticketId/cancel
 */
const cancelTicket = async (req, res, next) => {
  try {
    const { ticketId } = req.params;
    let appointment = await Appointment.findOne({ appointmentId: ticketId });
    if (!appointment) {
      appointment = await Appointment.findOne({ ticketNumber: ticketId });
    }
    if (!appointment) {
      throw new ApiError("Ticket or appointment not found.", 404);
    }

    appointment.status = "cancelled";
    await appointment.save();

    const io = req.app.get("io");
    if (io) {
      io.to(`salon:${appointment.salonId}`).emit("queue:cancelled", {
        appointmentId: appointment.appointmentId,
        ticketNumber: appointment.ticketNumber,
        status: "cancelled",
      });
      io.emit("queue:updated", {
        salonId: appointment.salonId,
        appointmentId: appointment.appointmentId,
        status: "cancelled",
      });
    }

    return sendSuccess(res, { appointment }, "Ticket cancelled successfully.");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCustomerBooking,
  getTicketStatus,
  getMyBookings,
  cancelTicket,
};
