const express = require("express");
const router = express.Router();
const { getReviews, respondToReview, updateReviewStatus } = require("../controllers/reviewController");
const { protect, requirePermission } = require("../middleware/auth");

router.use(protect);

router.get("/", getReviews);

router.use(requirePermission("manage_reviews"));
router.patch("/:reviewId/respond", respondToReview);
router.patch("/:reviewId/status", updateReviewStatus);

module.exports = router;
