const Review = require("../models/Review");
const ApiError = require("../utils/apiError");
const { sendSuccess } = require("../utils/apiResponse");

/** GET /api/reviews */
const getReviews = async (req, res, next) => {
  try {
    const filter = { salonId: req.manager.salonId };
    if (req.query.status) filter.status = req.query.status;
    if (req.query.rating) filter.rating = parseInt(req.query.rating);

    const reviews = await Review.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(req.query.limit) || 50);

    const avgRating = reviews.length
      ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
      : 0;

    return sendSuccess(res, { reviews, count: reviews.length, avgRating });
  } catch (err) {
    next(err);
  }
};

/** PATCH /api/reviews/:reviewId/respond */
const respondToReview = async (req, res, next) => {
  try {
    const { response } = req.body;
    if (!response) throw new ApiError("Response text is required.", 400);

    const review = await Review.findOneAndUpdate(
      { reviewId: req.params.reviewId, salonId: req.manager.salonId },
      { $set: { managerResponse: response } },
      { new: true }
    );

    if (!review) throw new ApiError("Review not found.", 404);
    return sendSuccess(res, { review }, "Response added.");
  } catch (err) {
    next(err);
  }
};

/** PATCH /api/reviews/:reviewId/status */
const updateReviewStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!["published", "hidden", "pending"].includes(status)) {
      throw new ApiError("Invalid status.", 400);
    }

    const review = await Review.findOneAndUpdate(
      { reviewId: req.params.reviewId, salonId: req.manager.salonId },
      { $set: { status } },
      { new: true }
    );

    if (!review) throw new ApiError("Review not found.", 404);
    return sendSuccess(res, { review }, "Review status updated.");
  } catch (err) {
    next(err);
  }
};

module.exports = { getReviews, respondToReview, updateReviewStatus };
