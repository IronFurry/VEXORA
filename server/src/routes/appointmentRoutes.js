const express = require("express");
const router = express.Router();
const {
  getAppointments, getAppointment, createAppointment,
  updateAppointment, updateAppointmentStatus, checkIn
} = require("../controllers/appointmentController");
const { protect, requirePermission } = require("../middleware/auth");

router.use(protect);

router.get("/", getAppointments);
router.get("/:appointmentId", getAppointment);

router.use(requirePermission("manage_appointments"));
router.post("/", createAppointment);
router.patch("/:appointmentId", updateAppointment);
router.patch("/:appointmentId/status", updateAppointmentStatus);
router.post("/:appointmentId/checkin", checkIn);

module.exports = router;
