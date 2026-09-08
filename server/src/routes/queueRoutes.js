const express = require("express");
const router = express.Router();
const { getQueue, joinQueue, startService, completeService, cancelQueue } = require("../controllers/queueController");
const { protect, requirePermission } = require("../middleware/auth");

router.use(protect);

router.get("/", getQueue);

router.use(requirePermission("manage_appointments"));
router.post("/join", joinQueue);
router.patch("/:appointmentId/start", startService);
router.patch("/:appointmentId/complete", completeService);
router.patch("/:appointmentId/cancel", cancelQueue);

module.exports = router;
