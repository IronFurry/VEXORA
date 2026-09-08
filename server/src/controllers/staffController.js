const Staff = require("../models/Staff");
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
      schedule: schedule || {},
      joiningDate: joiningDate ? new Date(joiningDate) : null,
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

module.exports = { getStaff, getStaffMember, createStaff, updateStaff, deleteStaff };
