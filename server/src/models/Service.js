const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    serviceId: {
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

    serviceName: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      default: ""
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    duration: {
      type: Number,
      required: true,
      min: 1
    },

    assignedStaff: {
      type: [String],
      default: []
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active"
    }
  },
  {
    timestamps: true
  }
);

serviceSchema.index({
  salonId: 1
});

module.exports = mongoose.model("Service", serviceSchema);