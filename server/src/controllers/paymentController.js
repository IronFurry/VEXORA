const Payment = require("../models/Payment");
const Appointment = require("../models/Appointment");
const ApiError = require("../utils/apiError");
const { sendSuccess } = require("../utils/apiResponse");

/** GET /api/payments */
const getPayments = async (req, res, next) => {
  try {
    const { salonId } = req.manager;
    const filter = { salonId };

    if (req.query.status) filter.status = req.query.status;
    if (req.query.customerId) filter.customerId = req.query.customerId;

    const payments = await Payment.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(req.query.limit) || 50);

    return sendSuccess(res, { payments, count: payments.length });
  } catch (err) {
    next(err);
  }
};

/** POST /api/payments */
const createPayment = async (req, res, next) => {
  try {
    const { appointmentId, customerId, amount, paymentGateway, paymentMethod, transactionId } = req.body;

    if (!appointmentId || !customerId || amount == null) {
      throw new ApiError("appointmentId, customerId, and amount are required.", 400);
    }

    const appointment = await Appointment.findOne({
      appointmentId,
      salonId: req.manager.salonId
    });
    if (!appointment) throw new ApiError("Appointment not found.", 404);

    const count = await Payment.countDocuments();
    const paymentId = `PAY-${String(count + 1).padStart(3, "0")}-${Date.now().toString().slice(-4)}`;

    const payment = await Payment.create({
      paymentId,
      appointmentId,
      customerId,
      salonId: req.manager.salonId,
      amount,
      paymentGateway: paymentGateway || "cash",
      paymentMethod: paymentMethod || "cash",
      transactionId: transactionId || null,
      status: "paid",
      paymentTime: new Date()
    });

    // Update appointment with paymentId and mark completed
    await Appointment.findOneAndUpdate(
      { appointmentId },
      { $set: { paymentId, status: "completed" } }
    );

    return sendSuccess(res, { payment }, "Payment recorded.", 201);
  } catch (err) {
    next(err);
  }
};

/** GET /api/payments/summary - Revenue stats */
const getPaymentSummary = async (req, res, next) => {
  try {
    const { salonId } = req.manager;
    const days = parseInt(req.query.days) || 7;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0);

    const summary = await Payment.aggregate([
      {
        $match: {
          salonId,
          status: "paid",
          paymentTime: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$paymentTime" } },
          revenue: { $sum: "$amount" },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const totalRevenue = summary.reduce((s, d) => s + d.revenue, 0);
    const totalTransactions = summary.reduce((s, d) => s + d.count, 0);

    return sendSuccess(res, { summary, totalRevenue, totalTransactions, days });
  } catch (err) {
    next(err);
  }
};

module.exports = { getPayments, createPayment, getPaymentSummary };
