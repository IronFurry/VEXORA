const mongoose = require("mongoose");

const staffAttendanceSchema = new mongoose.Schema(
  {
    attendanceId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    staffId: {
      type: String,
      required: true,
      trim: true
    },

    salonId: {
      type: String,
      required: true,
      trim: true
    },

    date: {
      type: Date,
      required: true
    },

    checkIn: {
      type: Date,
      default: null
    },

    checkOut: {
      type: Date,
      default: null
    },

    workingMinutes: {
      type: Number,
      default: 0,
      min: 0
    },

    status: {
      type: String,
      enum: [
        "present",
        "absent",
        "late",
        "half_day",
        "leave"
      ],
      default: "present"
    },

    notes: {
      type: String,
      default: "",
      trim: true
    }
  },
  {
    timestamps: true
  }
);

// Find attendance for a particular staff member
staffAttendanceSchema.index({
  staffId: 1,
  date: -1
});

// Find attendance for a salon
staffAttendanceSchema.index({
  salonId: 1,
  date: -1
});

// One attendance record per staff member per day
staffAttendanceSchema.index(
  {
    staffId: 1,
    date: 1
  },
  {
    unique: true
  }
);

module.exports = mongoose.model(
  "StaffAttendance",
  staffAttendanceSchema
);