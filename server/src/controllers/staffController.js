const Staff = require("../models/Staff");
const StaffAttendance = require("../models/StaffAttendance");
const ApiError = require("../utils/apiError");
const { sendSuccess } = require("../utils/apiResponse");

/** GET /api/staff */
const getStaff = async (req, res, next) => {
  try {
    const { salonId } = req.manager;
    const filter = { salonId };
    if (req.query.status) filter.status = req.query.status;
    if (req.query.role) filter.role = req.query.role;

    const staff = await Staff.find(filter).sort({ name: 1 });
    return sendSuccess(res, { staff, count: staff.length });
  } catch (err) {
    next(err);
  }
};

/** GET /api/staff/attendance/today */
const getTodayAttendance = async (req, res, next) => {
  try {
    const { salonId } = req.manager;
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const [staffList, attendanceRecords] = await Promise.all([
      Staff.find({ salonId }).sort({ name: 1 }),
      StaffAttendance.find({
        salonId,
        date: { $gte: todayStart, $lte: todayEnd },
      }),
    ]);

    const attendanceMap = {};
    attendanceRecords.forEach((att) => {
      attendanceMap[att.staffId] = att;
    });

    const summary = {
      total: staffList.length,
      present: attendanceRecords.filter((a) => a.status === "present").length,
      late: attendanceRecords.filter((a) => a.status === "late").length,
      halfDay: attendanceRecords.filter((a) => a.status === "half_day").length,
      absent: attendanceRecords.filter((a) => a.status === "absent" || a.status === "leave").length,
    };

    return sendSuccess(res, {
      attendance: attendanceRecords,
      attendanceMap,
      summary,
    });
  } catch (err) {
    next(err);
  }
};

/** POST /api/staff/attendance/mark */
const markAttendance = async (req, res, next) => {
  try {
    const { salonId } = req.manager;
    const { staffId, status, notes } = req.body;

    if (!staffId || !status) {
      throw new ApiError("staffId and status are required.", 400);
    }

    const staffMember = await Staff.findOne({ staffId, salonId });
    if (!staffMember) throw new ApiError("Staff member not found.", 404);

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    let record = await StaffAttendance.findOne({
      staffId,
      salonId,
      date: { $gte: todayStart, $lte: todayEnd },
    });

    const checkInTime = status === "absent" || status === "leave" ? null : (record?.checkIn || new Date());

    if (record) {
      record.status = status;
      if (notes !== undefined) record.notes = notes;
      if (checkInTime) record.checkIn = checkInTime;
      await record.save();
    } else {
      const count = await StaffAttendance.countDocuments();
      const attendanceId = `ATT-${String(count + 1).padStart(4, "0")}-${Date.now().toString().slice(-4)}`;
      record = await StaffAttendance.create({
        attendanceId,
        staffId,
        salonId,
        date: new Date(),
        checkIn: checkInTime,
        status,
        notes: notes || "",
      });
    }

    // Update staff active status based on attendance
    if (status === "present" || status === "late") {
      await Staff.updateOne({ staffId, salonId }, { $set: { status: "active" } });
    } else if (status === "absent" || status === "leave") {
      await Staff.updateOne({ staffId, salonId }, { $set: { status: "inactive" } });
    }

    return sendSuccess(res, { attendance: record }, "Attendance recorded successfully.");
  } catch (err) {
    next(err);
  }
};

/** GET /api/staff/:staffId */
const getStaffMember = async (req, res, next) => {
  try {
    const member = await Staff.findOne({
      staffId: req.params.staffId,
      salonId: req.manager.salonId
    });
    if (!member) throw new ApiError("Staff member not found.", 404);
    return sendSuccess(res, { staff: member });
  } catch (err) {
    next(err);
  }
};

/** POST /api/staff */
const createStaff = async (req, res, next) => {
  try {
    const { name, phone, email, role, specialization, reportsTo, assignedServices, schedule, joiningDate, employmentType } = req.body;

    if (!name || !phone || !role) {
      throw new ApiError("name, phone, and role are required.", 400);
    }

    const count = await Staff.countDocuments({ salonId: req.manager.salonId });
    const staffId = `STF-${String(count + 1).padStart(3, "0")}-${Date.now().toString().slice(-4)}`;

    const member = await Staff.create({
      staffId,
      salonId: req.manager.salonId,
      name,
      phone,
      email: email || "",
      role,
      specialization: specialization || [],
      reportsTo: reportsTo || null,
      assignedServices: assignedServices || [],
      schedule: schedule || {
        monday: "09:00-18:00",
        tuesday: "09:00-18:00",
        wednesday: "09:00-18:00",
        thursday: "09:00-18:00",
        friday: "09:00-18:00",
        saturday: "09:00-18:00",
        sunday: "10:00-17:00"
      },
      joiningDate: joiningDate ? new Date(joiningDate) : new Date(),
      employmentType: employmentType || "full_time",
      status: "active"
    });

    return sendSuccess(res, { staff: member }, "Staff member created.", 201);
  } catch (err) {
    next(err);
  }
};

/** PATCH /api/staff/:staffId */
const updateStaff = async (req, res, next) => {
  try {
    const allowed = ["name", "phone", "email", "role", "specialization", "reportsTo", "assignedServices", "schedule", "employmentType", "status"];
    const updates = {};
    allowed.forEach((f) => {
      if (req.body[f] !== undefined) updates[f] = req.body[f];
    });

    const member = await Staff.findOneAndUpdate(
      { staffId: req.params.staffId, salonId: req.manager.salonId },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!member) throw new ApiError("Staff member not found.", 404);
    return sendSuccess(res, { staff: member }, "Staff updated.");
  } catch (err) {
    next(err);
  }
};

/** DELETE /api/staff/:staffId */
const deleteStaff = async (req, res, next) => {
  try {
    const member = await Staff.findOneAndDelete({
      staffId: req.params.staffId,
      salonId: req.manager.salonId
    });
    if (!member) throw new ApiError("Staff member not found.", 404);
    return sendSuccess(res, null, "Staff member removed.");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getStaff,
  getTodayAttendance,
  markAttendance,
  getStaffMember,
  createStaff,
  updateStaff,
  deleteStaff,
};
