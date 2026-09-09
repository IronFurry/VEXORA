const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    paymentId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    appointmentId: {
      type: String,
      required: true,
      trim: true
    },

    customerId: {
      type: String,
      required: true,
      trim: true
    },

    salonId: {
      type: String,
      required: true,
      trim: true
    },

    amount: {
      type: Number,
      required: true,
      min: 0
    },

    paymentGateway: {
      type: String,
      enum: ["razorpay", "stripe", "cash", "other"],
      default: "razorpay"
    },

    transactionId: {
      type: String,
      default: null,
      trim: true
    },

    paymentMethod: {
      type: String,
      enum: [
        "upi",
        "card",
        "netbanking",
        "wallet",
        "cash",
        "other"
      ],
      default: "upi"
    },

    status: {
      type: String,
      enum: [
        "pending",
        "paid",
        "failed",
        "refunded",
        "cancelled"
      ],
      default: "pending"
    },

    // Exact date and time when payment was completed
    paymentTime: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

// Customer payment history
paymentSchema.index({
  customerId: 1,
  createdAt: -1
});

// Salon payment history
paymentSchema.index({
  salonId: 1,
  createdAt: -1
});

// Find payment for an appointment
paymentSchema.index({
  appointmentId: 1
});

// Find transactions
paymentSchema.index({
  transactionId: 1
});

module.exports = mongoose.model("Payment", paymentSchema);