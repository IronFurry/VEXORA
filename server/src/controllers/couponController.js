const Coupon = require("../models/Coupon");
const ApiError = require("../utils/apiError");
const { sendSuccess } = require("../utils/apiResponse");

/** GET /api/coupons */
const getCoupons = async (req, res, next) => {
  try {
    const filter = { salonId: req.manager.salonId };
    if (req.query.status) filter.status = req.query.status;

    const coupons = await Coupon.find(filter).sort({ createdAt: -1 });
    return sendSuccess(res, { coupons, count: coupons.length });
  } catch (err) {
    next(err);
  }
};

/** POST /api/coupons */
const createCoupon = async (req, res, next) => {
  try {
    const { code, discountType, discountValue, minimumAmount, maximumDiscount, validFrom, validUntil, usageLimit } = req.body;

    if (!code || !discountType || discountValue == null || !validFrom || !validUntil) {
      throw new ApiError("code, discountType, discountValue, validFrom and validUntil are required.", 400);
    }

    const count = await Coupon.countDocuments({ salonId: req.manager.salonId });
    const couponId = `CPN-${String(count + 1).padStart(3, "0")}-${Date.now().toString().slice(-4)}`;

    const coupon = await Coupon.create({
      couponId,
      salonId: req.manager.salonId,
      code: code.toUpperCase(),
      discountType,
      discountValue,
      minimumAmount: minimumAmount || 0,
      maximumDiscount: maximumDiscount || null,
      validFrom: new Date(validFrom),
      validUntil: new Date(validUntil),
      usageLimit: usageLimit || null,
      usedCount: 0,
      status: "active"
    });

    return sendSuccess(res, { coupon }, "Coupon created.", 201);
  } catch (err) {
    next(err);
  }
};

/** PATCH /api/coupons/:couponId/toggle */
const toggleCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.findOne({
      couponId: req.params.couponId,
      salonId: req.manager.salonId
    });
    if (!coupon) throw new ApiError("Coupon not found.", 404);

    coupon.status = coupon.status === "active" ? "inactive" : "active";
    await coupon.save();

    return sendSuccess(res, { coupon }, `Coupon ${coupon.status}.`);
  } catch (err) {
    next(err);
  }
};

/** POST /api/coupons/validate */
const validateCoupon = async (req, res, next) => {
  try {
    const { code, orderAmount } = req.body;
    if (!code) throw new ApiError("Coupon code is required.", 400);

    const coupon = await Coupon.findOne({
      salonId: req.manager.salonId,
      code: code.toUpperCase(),
      status: "active"
    });

    if (!coupon) throw new ApiError("Invalid or expired coupon.", 404);

    const now = new Date();
    if (now < coupon.validFrom || now > coupon.validUntil) {
      throw new ApiError("Coupon is not valid at this time.", 400);
    }

    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      throw new ApiError("Coupon usage limit reached.", 400);
    }

    if (orderAmount && coupon.minimumAmount && orderAmount < coupon.minimumAmount) {
      throw new ApiError(`Minimum order amount of ₹${coupon.minimumAmount} required.`, 400);
    }

    let discount = 0;
    if (coupon.discountType === "percentage") {
      discount = (orderAmount || 0) * (coupon.discountValue / 100);
      if (coupon.maximumDiscount) discount = Math.min(discount, coupon.maximumDiscount);
    } else {
      discount = coupon.discountValue;
    }

    return sendSuccess(res, { coupon, discount: Math.round(discount) }, "Coupon valid.");
  } catch (err) {
    next(err);
  }
};

module.exports = { getCoupons, createCoupon, toggleCoupon, validateCoupon };
