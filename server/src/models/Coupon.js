const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    couponId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    salonId: {
      type: String,
      required: true,
      trim: true
    },

    code: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },

    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true
    },

    discountValue: {
      type: Number,
      required: true,
      min: 0
    },

    minimumAmount: {
      type: Number,
      default: 0,
      min: 0
    },

    maximumDiscount: {
      type: Number,
      default: null,
      min: 0
    },

    validFrom: {
      type: Date,
      required: true
    },

    validUntil: {
      type: Date,
      required: true
    },

    usageLimit: {
      type: Number,
      default: null,
      min: 1
    },

    usedCount: {
      type: Number,
      default: 0,
      min: 0
    },

    status: {
      type: String,
      enum: ["active", "inactive", "expired"],
      default: "active"
    }
  },
  {
    timestamps: true
  }
);

// Find coupons belonging to a salon
couponSchema.index({
  salonId: 1
});

// Quickly find a coupon by code
couponSchema.index({
  salonId: 1,
  code: 1
});

module.exports = mongoose.model("Coupon", couponSchema);