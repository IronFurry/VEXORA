const mongoose = require("mongoose");

const salonSchema = new mongoose.Schema(
  {
    salonId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    salonName: {
      type: String,
      required: true,
      trim: true
    },

    ownerId: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      default: ""
    },

    contact: {
      phone: {
        type: String,
        required: true
      },
      email: {
        type: String,
        default: ""
      }
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point"
      },

      coordinates: {
        type: [Number],
        required: true
      },

      address: {
        type: String,
        required: true
      }
    },

    workingHours: {
      monday: String,
      tuesday: String,
      wednesday: String,
      thursday: String,
      friday: String,
      saturday: String,
      sunday: String
    },

    images: {
      type: [String],
      default: []
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },

    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "active"
    }
  },
  {
    timestamps: true
  }
);

// Used for nearby salon search
salonSchema.index({
  location: "2dsphere"
});

module.exports = mongoose.model("Salon", salonSchema);