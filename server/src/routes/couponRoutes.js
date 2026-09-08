const express = require("express");
const router = express.Router();
const { getCoupons, createCoupon, toggleCoupon, validateCoupon } = require("../controllers/couponController");
const { protect, requirePermission } = require("../middleware/auth");

router.use(protect);

router.get("/", getCoupons);
router.post("/validate", validateCoupon);

router.use(requirePermission("manage_coupons"));
router.post("/", createCoupon);
router.patch("/:couponId/toggle", toggleCoupon);

module.exports = router;
