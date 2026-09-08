const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    reviewId: {
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

    appointmentId: {
      type: String,
      required: true,
      trim: true
    },

    serviceId: {
      type: String,
      required: true,
      trim: true
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },

    comment: {
      type: String,
      default: "",
      trim: true
    },

    managerResponse: {
      type: String,
      default: "",
      trim: true
    },

    status: {
      type: String,
      enum: ["published", "hidden", "pending"],
      default: "published"
    }
  },
  {
    timestamps: true
  }
);

// Customer's reviews
reviewSchema.index({
  customerId: 1,
  createdAt: -1
});

// Salon reviews
reviewSchema.index({
  salonId: 1,
  createdAt: -1
});

// Appointment review lookup
reviewSchema.index({
  appointmentId: 1
});

module.exports = mongoose.model("Review", reviewSchema);