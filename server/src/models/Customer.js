const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    // Personal Details
    name: {
      type: String,
      required: true,
      trim: true
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    email: {
      type: String,
      default: "",
      trim: true
    },

    gender: {
      type: String,
      enum: ["male", "female", "other", "prefer_not_to_say"],
      default: "prefer_not_to_say"
    },

    dateOfBirth: {
      type: Date,
      default: null
    },

    preferredLanguage: {
      type: String,
      default: "en",
      trim: true
    },

    // Wishlist - Saved Salons
    wishlistSalons: {
      type: [String],
      default: []
    },

    // Favorite Salon Workers
    favoriteStaff: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Customer", customerSchema);