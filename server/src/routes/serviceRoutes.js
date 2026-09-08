const express = require("express");
const router = express.Router();
const { getServices, getService, createService, updateService, deleteService } = require("../controllers/serviceController");
const { protect, requirePermission } = require("../middleware/auth");

router.use(protect);

router.get("/", getServices);
router.get("/:serviceId", getService);

router.use(requirePermission("manage_services"));
router.post("/", createService);
router.patch("/:serviceId", updateService);
router.delete("/:serviceId", deleteService);

module.exports = router;
