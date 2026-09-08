const express = require("express");
const router = express.Router();
const { getCustomers, getCustomer, createCustomer } = require("../controllers/customerController");
const { protect } = require("../middleware/auth");

router.use(protect);

router.get("/", getCustomers);
router.get("/:customerId", getCustomer);
router.post("/", createCustomer);

module.exports = router;
