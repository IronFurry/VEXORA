const express = require("express");
const router = express.Router();
const { getPayments, createPayment, getPaymentSummary } = require("../controllers/paymentController");
const { protect, requirePermission } = require("../middleware/auth");

router.use(protect);
router.use(requirePermission("view_payments"));

router.get("/", getPayments);
router.get("/summary", getPaymentSummary);
router.post("/", createPayment);

module.exports = router;
