const Salon = require("../models/Salon");
const ApiError = require("../utils/apiError");
const { sendSuccess } = require("../utils/apiResponse");

/**
 * GET /api/salon
 * Returns the salon profile for the authenticated manager.
 */
const getMySalon = async (req, res, next) => {
  try {
    const salon = await Salon.findOne({ salonId: req.manager.salonId });
    if (!salon) throw new ApiError("Salon not found.", 404);
    return sendSuccess(res, { salon });
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/salon
 * Update salon details (owner or managers with manage_services permission)
 */
const updateSalon = async (req, res, next) => {
  try {
    const allowed = ["salonName", "description", "contact", "workingHours", "images", "status"];
    const updates = {};
    allowed.forEach((f) => {
      if (req.body[f] !== undefined) updates[f] = req.body[f];
    });

    const salon = await Salon.findOneAndUpdate(
      { salonId: req.manager.salonId },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!salon) throw new ApiError("Salon not found.", 404);
    return sendSuccess(res, { salon }, "Salon updated successfully.");
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/salon/nearby?lng=77.5&lat=12.9&radius=5000
 * Find nearby salons (public endpoint — no auth required)
 */
const getNearbySalons = async (req, res, next) => {
  try {
    const { lng, lat, radius = 5000 } = req.query;

    if (!lng || !lat) throw new ApiError("lng and lat query parameters are required.", 400);

    const salons = await Salon.find({
      status: "active",
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: parseInt(radius)
        }
      }
    }).limit(20);

    return sendSuccess(res, { salons, count: salons.length });
  } catch (err) {
    next(err);
  }
};

module.exports = { getMySalon, updateSalon, getNearbySalons };
