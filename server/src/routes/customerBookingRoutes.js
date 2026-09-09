const express = require("express");
const router = express.Router();
const {
  createCustomerBooking,
  getTicketStatus,
  getMyBookings,
  cancelTicket,
  handleCustomerChat,
} = require("../controllers/customerBookingController");

// Public Customer Endpoints (No manager auth needed)
router.post("/bookings", createCustomerBooking);
router.post("/chat", handleCustomerChat);
router.get("/tickets/:ticketId", getTicketStatus);
router.patch("/tickets/:ticketId/cancel", cancelTicket);
router.get("/my-bookings", getMyBookings);

module.exports = router;
