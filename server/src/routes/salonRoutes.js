const express = require("express");
const router = express.Router();
const {
  getMySalon,
  updateSalon,
  getNearbySalons,
  getAllPublicSalons,
} = require("../controllers/salonController");
const { protect, requirePermission } = require("../middleware/auth");

// Public endpoints
router.get("/public", getAllPublicSalons);
router.get("/nearby", getNearbySalons);

// Protected manager endpoints
router.use(protect);
router.get("/", getMySalon);
router.patch("/", requirePermission("manage_services"), updateSalon);

module.exports = router;
