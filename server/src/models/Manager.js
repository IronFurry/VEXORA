const mongoose = require("mongoose");

const managerSchema = new mongoose.Schema(
  {
    managerId: {
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

    name: {
      type: String,
      required: true,
      trim: true
    },

    phone: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },

    passwordHash: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["owner", "manager"],
      default: "manager",
      required: true
    },

    reportsTo: {
      type: String,
      default: null
    },

    permissions: {
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

managerSchema.index({
  salonId: 1
});

managerSchema.index({
  reportsTo: 1
});

module.exports = mongoose.model("Manager", managerSchema);