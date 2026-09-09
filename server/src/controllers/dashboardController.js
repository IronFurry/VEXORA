const Salon = require("../models/Salon");
const Appointment = require("../models/Appointment");
const Payment = require("../models/Payment");
const Review = require("../models/Review");
const Staff = require("../models/Staff");
const ApiError = require("../utils/apiError");
const { sendSuccess } = require("../utils/apiResponse");

/**
 * GET /api/dashboard/overview
 * Returns aggregated KPIs for the logged-in manager's salon.
 */
const getOverview = async (req, res, next) => {
  try {
    const { salonId } = req.manager;

    // Today's date range
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const [
      salon,
      totalStaff,
      activeQueue,
      completedToday,
      todayPayments,
      todayAppointments,
      recentReviews
    ] = await Promise.all([
      Salon.findOne({ salonId }),
      Staff.countDocuments({ salonId, status: "active" }),
      Appointment.countDocuments({
        salonId,
        appointmentDate: { $gte: todayStart, $lte: todayEnd },
        status: { $in: ["confirmed", "checked_in", "waiting", "in_service"] }
      }),
      Appointment.countDocuments({
        salonId,
        appointmentDate: { $gte: todayStart, $lte: todayEnd },
        status: "completed"
      }),
      Payment.aggregate([
        {
          $match: {
            salonId,
            status: "paid",
            paymentTime: { $gte: todayStart, $lte: todayEnd }
          }
        },
        { $group: { _id: null, total: { $sum: "$amount" }, count: { $sum: 1 } } }
      ]),
      Appointment.countDocuments({
        salonId,
        appointmentDate: { $gte: todayStart, $lte: todayEnd }
      }),
      Review.find({ salonId })
        .sort({ createdAt: -1 })
        .limit(5)
        .select("rating comment customerId createdAt")
    ]);

    const paymentSum = todayPayments[0]?.total || 0;
    const paymentCount = todayPayments[0]?.count || 0;

    // Check completed appointments today to ensure all revenue is captured
    const completedApts = await Appointment.find({
      salonId,
      appointmentDate: { $gte: todayStart, $lte: todayEnd },
      status: "completed"
    });
    const aptRevenue = completedApts.reduce((sum, a) => sum + (a.price || 0), 0);
    const revenueToday = Math.max(paymentSum, aptRevenue);
    const transactionsToday = Math.max(paymentCount, completedApts.length);

    // In-service count
    const inServiceCount = await Appointment.countDocuments({
      salonId,
      appointmentDate: { $gte: todayStart, $lte: todayEnd },
      status: "in_service"
    });

    const capacity = totalStaff > 0 ? Math.round((inServiceCount / totalStaff) * 100) : 0;

    return sendSuccess(res, {
      salon: { salonId: salon?.salonId, salonName: salon?.salonName, rating: salon?.rating },
      kpis: {
        completedToday,
        revenueToday,
        transactionsToday,
        activeQueue,
        inServiceCount,
        todayAppointments,
        totalStaff,
        capacity
      },
      recentReviews
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getOverview };
