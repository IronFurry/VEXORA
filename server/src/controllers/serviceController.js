const Service = require("../models/Service");
const ApiError = require("../utils/apiError");
const { sendSuccess } = require("../utils/apiResponse");

/** GET /api/services */
const getServices = async (req, res, next) => {
  try {
    const { salonId } = req.manager;
    const filter = { salonId };
    if (req.query.status) filter.status = req.query.status;
    if (req.query.category) filter.category = req.query.category;

    const services = await Service.find(filter).sort({ category: 1, serviceName: 1 });
    return sendSuccess(res, { services, count: services.length });
  } catch (err) {
    next(err);
  }
};

/** GET /api/services/:serviceId */
const getService = async (req, res, next) => {
  try {
    const service = await Service.findOne({
      serviceId: req.params.serviceId,
      salonId: req.manager.salonId
    });
    if (!service) throw new ApiError("Service not found.", 404);
    return sendSuccess(res, { service });
  } catch (err) {
    next(err);
  }
};

/** POST /api/services */
const createService = async (req, res, next) => {
  try {
    const { serviceName, category, description, price, duration, assignedStaff } = req.body;

    if (!serviceName || !category || price == null || !duration) {
      throw new ApiError("serviceName, category, price, and duration are required.", 400);
    }

    // Generate a serviceId
    const count = await Service.countDocuments({ salonId: req.manager.salonId });
    const serviceId = `SRV-${String(count + 1).padStart(3, "0")}-${Date.now().toString().slice(-4)}`;

    const service = await Service.create({
      serviceId,
      salonId: req.manager.salonId,
      serviceName,
      category,
      description: description || "",
      price,
      duration,
      assignedStaff: assignedStaff || [],
      status: "active"
    });

    return sendSuccess(res, { service }, "Service created successfully.", 201);
  } catch (err) {
    next(err);
  }
};

/** PATCH /api/services/:serviceId */
const updateService = async (req, res, next) => {
  try {
    const allowed = ["serviceName", "category", "description", "price", "duration", "assignedStaff", "status"];
    const updates = {};
    allowed.forEach((f) => {
      if (req.body[f] !== undefined) updates[f] = req.body[f];
    });

    const service = await Service.findOneAndUpdate(
      { serviceId: req.params.serviceId, salonId: req.manager.salonId },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!service) throw new ApiError("Service not found.", 404);
    return sendSuccess(res, { service }, "Service updated.");
  } catch (err) {
    next(err);
  }
};

/** DELETE /api/services/:serviceId */
const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findOneAndDelete({
      serviceId: req.params.serviceId,
      salonId: req.manager.salonId
    });
    if (!service) throw new ApiError("Service not found.", 404);
    return sendSuccess(res, null, "Service deleted.");
  } catch (err) {
    next(err);
  }
};

module.exports = { getServices, getService, createService, updateService, deleteService };
