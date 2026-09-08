const express = require("express");
const router = express.Router();
const { getStaff, getStaffMember, createStaff, updateStaff, deleteStaff } = require("../controllers/staffController");
const { protect, requirePermission } = require("../middleware/auth");

router.use(protect);

router.get("/", getStaff);
router.get("/:staffId", getStaffMember);

router.use(requirePermission("manage_staff"));
router.post("/", createStaff);
router.patch("/:staffId", updateStaff);
router.delete("/:staffId", deleteStaff);

module.exports = router;
