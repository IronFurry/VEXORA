import { api } from "./client";

export const dashboardApi = {
  /** GET /api/dashboard/overview */
  getOverview: () => api.get("/dashboard/overview"),

  /** GET /api/queue */
  getQueue: () => api.get("/queue"),

  /** POST /api/queue/join */
  joinQueue: (customerId, serviceId, staffId) =>
    api.post("/queue/join", { customerId, serviceId, staffId }),

  /** PATCH /api/queue/:id/start */
  startService: (appointmentId) => api.patch(`/queue/${appointmentId}/start`),

  /** PATCH /api/queue/:id/complete */
  completeService: (appointmentId) => api.patch(`/queue/${appointmentId}/complete`),

  /** PATCH /api/queue/:id/cancel */
  cancelQueue: (appointmentId) => api.patch(`/queue/${appointmentId}/cancel`),

  /** PATCH /api/queue/:id/move-up */
  moveUp: (appointmentId) => api.patch(`/queue/${appointmentId}/move-up`),

  /** GET /api/appointments */
  getAppointments: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return api.get(`/appointments${qs ? `?${qs}` : ""}`);
  },

  /** PATCH /api/appointments/:id/status */
  updateAppointmentStatus: (appointmentId, status) =>
    api.patch(`/appointments/${appointmentId}/status`, { status }),

  /** GET /api/services */
  getServices: () => api.get("/services"),

  /** POST /api/services */
  createService: (data) => api.post("/services", data),

  /** PATCH /api/services/:id */
  updateService: (serviceId, data) => api.patch(`/services/${serviceId}`, data),

  /** DELETE /api/services/:id */
  deleteService: (serviceId) => api.delete(`/services/${serviceId}`),

  /** GET /api/staff */
  getStaff: () => api.get("/staff"),

  /** POST /api/staff */
  createStaff: (data) => api.post("/staff", data),

  /** PATCH /api/staff/:id */
  updateStaff: (staffId, data) => api.patch(`/staff/${staffId}`, data),

  /** DELETE /api/staff/:id */
  deleteStaff: (staffId) => api.delete(`/staff/${staffId}`),

  /** GET /api/staff/attendance/today */
  getTodayAttendance: () => api.get("/staff/attendance/today"),

  /** POST /api/staff/attendance/mark */
  markAttendance: (data) => api.post("/staff/attendance/mark", data),

  /** GET /api/customers */
  getCustomers: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return api.get(`/customers${qs ? `?${qs}` : ""}`);
  },

  /** GET /api/inventory */
  getInventory: () => api.get("/inventory"),

  /** POST /api/inventory */
  createInventoryItem: (data) => api.post("/inventory", data),

  /** PATCH /api/inventory/:id/stock */
  updateStock: (inventoryId, delta) =>
    api.patch(`/inventory/${inventoryId}/stock`, { delta }),

  /** GET /api/reviews */
  getReviews: () => api.get("/reviews"),

  /** PATCH /api/reviews/:id/respond */
  respondToReview: (reviewId, response) =>
    api.patch(`/reviews/${reviewId}/respond`, { response }),

  /** GET /api/coupons */
  getCoupons: () => api.get("/coupons"),

  /** POST /api/coupons */
  createCoupon: (data) => api.post("/coupons", data),

  /** PATCH /api/coupons/:id/toggle */
  toggleCoupon: (couponId) => api.patch(`/coupons/${couponId}/toggle`),

  /** GET /api/payments/summary */
  getPaymentSummary: (days = 7) => api.get(`/payments/summary?days=${days}`),

  /** GET /api/salon */
  getSalon: () => api.get("/salon"),
};
