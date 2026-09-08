const express = require("express");
const router = express.Router();
const { getMySalon, updateSalon, getNearbySalons } = require("../controllers/salonController");
const { protect, requirePermission } = require("../middleware/auth");

router.get("/nearby", getNearbySalons); // Public

router.use(protect);
router.get("/", getMySalon);
router.patch("/", requirePermission("manage_services"), updateSalon); // Assuming manage_services gives some control, or maybe we need manage_salon

module.exports = router;
