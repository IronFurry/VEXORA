const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: String,
      required: true,
      unique: true,
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

    serviceId: {
      type: String,
      required: true,
      trim: true
    },

    staffId: {
      type: String,
      default: null,
      trim: true
    },

    appointmentDate: {
      type: Date,
      required: true
    },

    startTime: {
      type: String,
      required: true
    },

    endTime: {
      type: String,
      required: true
    },

    bookingType: {
      type: String,
      enum: ["appointment", "walk_in", "queue"],
      default: "appointment"
    },

    queuePosition: {
      type: Number,
      default: null
    },

    estimatedWaitTime: {
      type: Number,
      default: 0,
      min: 0
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    couponId: {
      type: String,
      default: null
    },

    paymentId: {
      type: String,
      default: null
    },

    checkIn: {
      status: {
        type: String,
        enum: ["not_checked_in", "checked_in"],
        default: "not_checked_in"
      },

      checkedInAt: {
        type: Date,
        default: null
      },

      checkedInBy: {
        type: String,
        default: null
      }
    },

    status: {
      type: String,
      enum: [
        "confirmed",
        "checked_in",
        "waiting",
        "in_service",
        "completed",
        "cancelled",
        "no_show"
      ],
      default: "confirmed"
    }
  },
  {
    timestamps: true
  }
);

// Useful for salon appointment queries
appointmentSchema.index({
  salonId: 1,
  appointmentDate: 1
});

// Useful for staff schedule
appointmentSchema.index({
  staffId: 1,
  appointmentDate: 1
});

// Useful for customer booking history
appointmentSchema.index({
  customerId: 1,
  appointmentDate: -1
});

// Useful for queue management
appointmentSchema.index({
  salonId: 1,
  appointmentDate: 1,
  status: 1
});

module.exports = mongoose.model("Appointment", appointmentSchema);