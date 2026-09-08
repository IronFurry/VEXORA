import { api } from "./client";

export const customerApi = {
  /**
   * Create a customer booking and generate queue ticket
   */
  createBooking: (data) =>
    api.post("/customer/bookings", data),

  /**
   * Natural language AI booking chatbot
   */
  chat: (data) =>
    api.post("/customer/chat", data),

  /**
   * Get ticket status and travel reminders
   */
  getTicket: (ticketId) =>
    api.get(`/customer/tickets/${ticketId}`),

  /**
   * Cancel / Delete a ticket
   */
  cancelTicket: (ticketId) =>
    api.patch(`/customer/tickets/${ticketId}/cancel`),

  /**
   * Get customer bookings by phone
   */
  getMyBookings: (phone) =>
    api.get(`/customer/my-bookings?phone=${encodeURIComponent(phone)}`),

  /**
   * Get public salons with real-time queue count & distance
   */
  getPublicSalons: (params = {}) => {
    const qs = new URLSearchParams();
    if (params.lat) qs.set("lat", params.lat);
    if (params.lng) qs.set("lng", params.lng);
    if (params.sort) qs.set("sort", params.sort);
    if (params.serviceCategory) qs.set("serviceCategory", params.serviceCategory);
    const qsStr = qs.toString();
    return api.get(`/salon/public${qsStr ? `?${qsStr}` : ""}`);
  },

  /**
   * Get nearby salons by radius
   */
  getNearbySalons: (params = {}) => {
    const qs = new URLSearchParams();
    if (params.lat) qs.set("lat", params.lat);
    if (params.lng) qs.set("lng", params.lng);
    if (params.radius) qs.set("radius", params.radius);
    const qsStr = qs.toString();
    return api.get(`/salon/nearby${qsStr ? `?${qsStr}` : ""}`);
  },
};
