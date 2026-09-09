const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    staffId: {
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
      default: "",
      trim: true
    },

    role: {
      type: String,
      enum: [
        "hair_stylist",
        "barber",
        "beautician",
        "makeup_artist",
        "receptionist",
        "other"
      ],
      required: true
    },

    specialization: {
      type: [String],
      default: []
    },

    reportsTo: {
      type: String,
      default: null
    },

    assignedServices: {
      type: [String],
      default: []
    },

    schedule: {
      monday: String,
      tuesday: String,
      wednesday: String,
      thursday: String,
      friday: String,
      saturday: String,
      sunday: String
    },

    joiningDate: {
      type: Date,
      default: null
    },

    employmentType: {
      type: String,
      enum: ["full_time", "part_time", "contract"],
      default: "full_time"
    },

    status: {
      type: String,
      enum: ["active", "inactive", "on_leave"],
      default: "active"
    }
  },
  {
    timestamps: true
  }
);

staffSchema.index({
  salonId: 1
});

staffSchema.index({
  reportsTo: 1
});

module.exports = mongoose.model("Staff", staffSchema);