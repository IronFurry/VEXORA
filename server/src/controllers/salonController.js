const Salon = require("../models/Salon");
const Appointment = require("../models/Appointment");
const Service = require("../models/Service");
const Staff = require("../models/Staff");
const queueEngine = require("../services/queueEngine");
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
 * Enrich salon documents with real-time queue count, wait time, staff, and services
 */
async function enrichSalonData(salons, userLat = null, userLng = null) {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  return Promise.all(
    salons.map(async (salon) => {
      const salonObj = salon.toObject ? salon.toObject() : salon;

      // Active queue entries today
      const queueEntries = await Appointment.find({
        salonId: salonObj.salonId,
        appointmentDate: { $gte: todayStart, $lte: todayEnd },
        status: { $in: ["waiting", "in_service"] },
      });

      const currentQueue = queueEntries.length;
      const waitTimeMinutes = currentQueue === 0 ? 0 : Math.max(8, currentQueue * 18);
      const waitTime = currentQueue === 0 ? "Available now" : `~${waitTimeMinutes} min wait`;

      // Available staff
      const staffList = await Staff.find({ salonId: salonObj.salonId, status: "active" }).select(
        "staffId name role rating assignedServices"
      );

      // Services catalog
      const servicesList = await Service.find({ salonId: salonObj.salonId, status: "active" }).select(
        "serviceId serviceName category price duration"
      );

      // Distance calculation
      let distanceKm = null;
      let distanceText = "1.2 km away";
      if (userLat != null && userLng != null && salonObj.location?.coordinates) {
        distanceKm = queueEngine.calculateDistance(
          userLat,
          userLng,
          salonObj.location.coordinates[1],
          salonObj.location.coordinates[0]
        );
        distanceText = `${distanceKm} km away`;
      }

      return {
        ...salonObj,
        id: salonObj.salonId || salonObj._id,
        name: salonObj.salonName || salonObj.name || "Vexora Partner Salon",
        salonName: salonObj.salonName || salonObj.name || "Vexora Partner Salon",
        address: salonObj.location?.address || salonObj.address || "Main Boulevard",
        currentQueue,
        waitTimeMinutes,
        waitTime,
        distanceKm,
        distance: distanceText,
        staff: staffList,
        services: servicesList,
      };
    })
  );
}

/**
 * GET /api/salon/public
 * Returns all active salons with real-time queues and distance sorting
 */
const getAllPublicSalons = async (req, res, next) => {
  try {
    const { lat, lng, sort = "recommended", serviceCategory } = req.query;
    const userLat = lat ? parseFloat(lat) : null;
    const userLng = lng ? parseFloat(lng) : null;

    const salons = await Salon.find({ status: "active" });
    let enriched = await enrichSalonData(salons, userLat, userLng);

    // Filter by service category if requested
    if (serviceCategory && serviceCategory !== "all") {
      enriched = enriched.filter((s) =>
        s.services.some((srv) => srv.category.toLowerCase() === serviceCategory.toLowerCase())
      );
    }

    // Sort options: recommended | nearest | rating | wait
    if (sort === "nearest" && userLat != null) {
      enriched.sort((a, b) => (a.distanceKm ?? 999) - (b.distanceKm ?? 999));
    } else if (sort === "rating") {
      enriched.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sort === "wait") {
      enriched.sort((a, b) => (a.waitTimeMinutes || 0) - (b.waitTimeMinutes || 0));
    } else {
      // Recommended: combination of rating, distance, and low wait time
      enriched.sort((a, b) => {
        const scoreA = (a.rating || 4.5) * 20 - (a.distanceKm || 2) * 5 - (a.currentQueue || 0) * 3;
        const scoreB = (b.rating || 4.5) * 20 - (b.distanceKm || 2) * 5 - (b.currentQueue || 0) * 3;
        return scoreB - scoreA;
      });
    }

    return sendSuccess(res, { salons: enriched, count: enriched.length });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/salon/nearby?lng=77.5&lat=12.9&radius=10000
 */
const getNearbySalons = async (req, res, next) => {
  try {
    const { lng, lat, radius = 15000, sort = "nearest" } = req.query;

    if (!lng || !lat) {
      return getAllPublicSalons(req, res, next);
    }

    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);

    let salons = [];
    try {
      salons = await Salon.find({
        status: "active",
        location: {
          $near: {
            $geometry: { type: "Point", coordinates: [userLng, userLat] },
            $maxDistance: parseInt(radius),
          },
        },
      }).limit(20);
    } catch {
      salons = await Salon.find({ status: "active" });
    }

    const enriched = await enrichSalonData(salons, userLat, userLng);
    return sendSuccess(res, { salons: enriched, count: enriched.length });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMySalon,
  updateSalon,
  getNearbySalons,
  getAllPublicSalons,
};
