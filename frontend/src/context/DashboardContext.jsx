import React, { createContext, useContext, useReducer, useCallback, useEffect, useState } from "react";
import { dashboardApi } from "../api/dashboardApi";
import { socket, joinSalonRoom } from "../api/socket";

export const MOCK_STAFF = [
  { id: 1, name: "Vikram Sharma", initials: "VS", role: "Senior Stylist", status: "in-service", assignedServices: ["Precision Fade","Beard Trim","Hot Towel Shave"], todayClients: 8, shift: "9:00 AM - 6:00 PM", rating: 4.9 },
  { id: 2, name: "Anita Rao", initials: "AR", role: "Colour Specialist", status: "available", assignedServices: ["Hair Colour","Highlights","Balayage","Keratin"], todayClients: 5, shift: "10:00 AM - 7:00 PM", rating: 4.8 },
  { id: 3, name: "Sameer Khan", initials: "SK", role: "Stylist", status: "in-service", assignedServices: ["Scissor Cut","Scalp Treatment","Hair Spa"], todayClients: 6, shift: "9:00 AM - 5:00 PM", rating: 4.7 },
  { id: 4, name: "Kunal Patel", initials: "KP", role: "Junior Stylist", status: "available", assignedServices: ["Basic Cut","Beard Trim","Face Cleanup"], todayClients: 4, shift: "11:00 AM - 8:00 PM", rating: 4.6 },
  { id: 5, name: "Priya Mehta", initials: "PM", role: "Skin Specialist", status: "break", assignedServices: ["Face Cleanup","Facial","Head Massage"], todayClients: 3, shift: "10:00 AM - 6:00 PM", rating: 4.8 },
];
export const MOCK_SERVICES = [
  { id: 1, name: "Precision Fade", category: "Hair", duration: 30, price: 650, available: true },
  { id: 2, name: "Classic Scissor Cut", category: "Hair", duration: 40, price: 550, available: true },
  { id: 3, name: "Beard Trim & Shape", category: "Beard", duration: 20, price: 300, available: true },
  { id: 4, name: "Hot Towel Shave", category: "Beard", duration: 30, price: 450, available: true },
  { id: 5, name: "Hair Colour", category: "Colour", duration: 90, price: 1800, available: true },
  { id: 6, name: "Balayage", category: "Colour", duration: 120, price: 3500, available: false },
  { id: 7, name: "Scalp Treatment", category: "Treatment", duration: 45, price: 900, available: true },
  { id: 8, name: "Hair Spa", category: "Treatment", duration: 60, price: 1200, available: true },
  { id: 9, name: "Face Cleanup", category: "Skin", duration: 30, price: 500, available: true },
  { id: 10, name: "Premium Facial", category: "Skin", duration: 60, price: 1500, available: true },
];
export const MOCK_INVENTORY = [
  { id: 1, name: "Wella Color Charm", category: "Colour", stock: 14, usedToday: 3, reorderAt: 5, unit: "bottles" },
  { id: 2, name: "Moroccan Oil Treatment", category: "Treatment", stock: 3, usedToday: 1, reorderAt: 5, unit: "bottles" },
  { id: 3, name: "Loreal Keratin Serum", category: "Treatment", stock: 8, usedToday: 2, reorderAt: 4, unit: "bottles" },
  { id: 4, name: "Barbicide Disinfectant", category: "Hygiene", stock: 2, usedToday: 1, reorderAt: 3, unit: "liters" },
  { id: 5, name: "Disposable Neck Strips", category: "Hygiene", stock: 45, usedToday: 12, reorderAt: 20, unit: "pieces" },
  { id: 6, name: "Schwarzkopf Shampoo", category: "Hair Care", stock: 6, usedToday: 4, reorderAt: 5, unit: "liters" },
];
export const MOCK_REVIEWS = [
  { id: 1, customer: "Nisha Patel", initials: "NP", rating: 5, comment: "Absolutely loved my balayage!", service: "Balayage", date: "Sep 7, 2026", reply: "" },
  { id: 2, customer: "Ravi Kumar", initials: "RK", rating: 4, comment: "Good experience, clean environment.", service: "Hair Spa", date: "Sep 6, 2026", reply: "Thank you for visiting us, Ravi!" },
  { id: 3, customer: "Sneha Joshi", initials: "SJ", rating: 5, comment: "Best facial I have ever had.", service: "Premium Facial", date: "Sep 5, 2026", reply: "" },
];
export const MOCK_CUSTOMERS = [
  { id: 1, name: "Nisha Patel", initials: "NP", phone: "+91 98765 43210", visits: 12, lastVisit: "Sep 7, 2026", totalSpend: 24500, tier: "Gold" },
  { id: 2, name: "Ravi Kumar", initials: "RK", phone: "+91 87654 32109", visits: 5, lastVisit: "Sep 6, 2026", totalSpend: 8200, tier: "Regular" },
  { id: 3, name: "Sneha Joshi", initials: "SJ", phone: "+91 76543 21098", visits: 8, lastVisit: "Sep 5, 2026", totalSpend: 15600, tier: "Silver" },
];
export const MOCK_COUPONS = [
  { id: 1, code: "WELCOME20", type: "percentage", value: 20, minOrder: 500, expiry: "Sep 30, 2026", used: 47, active: true, description: "20% off for new customers" },
  { id: 2, code: "FLAT100", type: "fixed", value: 100, minOrder: 800, expiry: "Oct 15, 2026", used: 23, active: true, description: "Rs 100 off on orders above Rs 800" },
  { id: 3, code: "WEEKEND15", type: "percentage", value: 15, minOrder: 600, expiry: "Sep 28, 2026", used: 12, active: false, description: "15% off on weekends" },
];
const initQueue = [
  { id: "Q-001", pos: 1, customer: "Arjun Singh", initials: "AS", service: "Precision Fade", staff: "Vikram Sharma", status: "in-service", eta: 12, duration: 30, elapsed: 18 },
  { id: "Q-002", pos: 2, customer: "Sameer Ali", initials: "SA", service: "Beard Trim & Shape", staff: "Kunal Patel", status: "waiting", eta: 12, duration: 20, elapsed: 0 },
  { id: "Q-003", pos: 3, customer: "Rohan Mehra", initials: "RM", service: "Hair Spa", staff: "Sameer Khan", status: "in-service", eta: 0, duration: 60, elapsed: 15 },
  { id: "Q-004", pos: 4, customer: "Kiran Desai", initials: "KD", service: "Classic Scissor Cut", staff: "Anita Rao", status: "waiting", eta: 57, duration: 40, elapsed: 0 },
];
const initAppointments = [
  { id: "APT-101", customer: "Nisha Patel", initials: "NP", service: "Balayage", staff: "Anita Rao", date: "Today", time: "2:00 PM", status: "confirmed", duration: 120 },
  { id: "APT-102", customer: "Ravi Kumar", initials: "RK", service: "Hair Spa", staff: "Sameer Khan", date: "Today", time: "3:30 PM", status: "confirmed", duration: 60 },
  { id: "APT-103", customer: "Sneha Joshi", initials: "SJ", service: "Premium Facial", staff: "Priya Mehta", date: "Today", time: "4:00 PM", status: "pending", duration: 60 },
];
const initialState = {
  queue: initQueue, appointments: initAppointments, customers: MOCK_CUSTOMERS,
  staff: MOCK_STAFF, services: MOCK_SERVICES, inventory: MOCK_INVENTORY,
  reviews: MOCK_REVIEWS, coupons: MOCK_COUPONS, completedToday: 0,
  revenueToday: 0,
  transactionsToday: 0,
  attendanceMap: {},
  attendanceSummary: { total: 0, present: 0, late: 0, halfDay: 0, absent: 0 },
  notifications: [
    { id: 1, text: "Sameer Ali joined the queue", time: "2 min ago", type: "join" },
    { id: 2, text: "Precision Fade started - Vikram", time: "8 min ago", type: "start" },
    { id: 3, text: "Appointment confirmed: Nisha Patel 2:00 PM", time: "12 min ago", type: "appt" },
    { id: 4, text: "Customer #Q-099 completed service", time: "18 min ago", type: "complete" },
    { id: 5, text: "Low stock alert: Moroccan Oil (3 left)", time: "1 hr ago", type: "alert" },
  ],
};
function recalcEtas(queue) {
  return queue.map((entry) => {
    if (entry.status === "in-service") return { ...entry, eta: Math.max(0, entry.duration - entry.elapsed) };
    const prev = queue.filter(q => q.pos < entry.pos && q.status !== "cancelled");
    return { ...entry, eta: prev.reduce((s, q) => s + Math.max(0, q.duration - (q.elapsed || 0)), 0) };
  });
}
function dashboardReducer(state, action) {
  switch (action.type) {
    case "LOAD_FROM_API": return { ...state, ...action.payload };
    case "START_SERVICE": {
      const updated = state.queue.map(q => q.id === action.id ? { ...q, status: "in-service", elapsed: 0 } : q);
      return { ...state, queue: recalcEtas(updated), notifications: [{ id: Date.now(), text: `${action.customerName} service started`, time: "Just now", type: "start" }, ...state.notifications].slice(0, 20) };
    }
    case "COMPLETE_SERVICE": {
      const entry = state.queue.find(q => q.id === action.id);
      const servicePrice = state.services.find(s => s.name === entry?.service)?.price || 650;
      const updated = state.queue.filter(q => q.id !== action.id).map((q, i) => ({ ...q, pos: i + 1 }));
      return { ...state, queue: recalcEtas(updated), completedToday: state.completedToday + 1, revenueToday: state.revenueToday + servicePrice, notifications: [{ id: Date.now(), text: `${entry?.customer} service completed`, time: "Just now", type: "complete" }, ...state.notifications].slice(0, 20) };
    }
    case "CANCEL_SERVICE": return { ...state, queue: recalcEtas(state.queue.filter(q => q.id !== action.id).map((q, i) => ({ ...q, pos: i + 1 }))) };
    case "MOVE_UP": {
      const idx = state.queue.findIndex(q => q.id === action.id);
      if (idx <= 0) return state;
      const updated = [...state.queue];
      [updated[idx - 1], updated[idx]] = [updated[idx], updated[idx - 1]];
      return { ...state, queue: recalcEtas(updated.map((q, i) => ({ ...q, pos: i + 1 }))) };
    }
    case "ADD_CUSTOMER": {
      const newEntry = { id: `Q-${String(Date.now()).slice(-3)}`, pos: state.queue.length + 1, customer: action.customer, initials: action.customer.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase(), service: action.service, staff: action.staff, status: "waiting", eta: 0, duration: state.services.find(s => s.name === action.service)?.duration || 30, elapsed: 0 };
      return { ...state, queue: recalcEtas([...state.queue, newEntry]), notifications: [{ id: Date.now(), text: `${action.customer} joined the queue`, time: "Just now", type: "join" }, ...state.notifications].slice(0, 20) };
    }
    case "UPDATE_STOCK": return { ...state, inventory: state.inventory.map(item => item.id === action.id ? { ...item, stock: item.stock + action.delta } : item) };
    case "TOGGLE_SERVICE": return { ...state, services: state.services.map(s => s.id === action.id ? { ...s, available: !s.available } : s) };
    case "ADD_SERVICE": return { ...state, services: [...state.services, { id: Date.now(), name: action.name, category: action.category, duration: action.duration, price: action.price, available: true }] };
    case "TOGGLE_COUPON": return { ...state, coupons: state.coupons.map(c => c.id === action.id ? { ...c, active: !c.active } : c) };
    case "ADD_COUPON": return { ...state, coupons: [...state.coupons, { id: Date.now(), code: action.code, type: action.couponType, value: action.value, minOrder: action.minOrder, expiry: action.expiry, used: 0, active: true, description: action.description }] };
    case "TOGGLE_STAFF_STATUS": return { ...state, staff: state.staff.map(s => s.id === action.id || s.staffId === action.id ? { ...s, status: { available: "break", break: "available", "in-service": "available" }[s.status] || "available" } : s) };
    case "ADD_STAFF": return { ...state, staff: [...state.staff, action.payload] };
    case "REMOVE_STAFF": return { ...state, staff: state.staff.filter(s => s.id !== action.id && s.staffId !== action.id) };
    case "UPDATE_ATTENDANCE": {
      const { staffId, attendance } = action.payload;
      const updatedMap = { ...state.attendanceMap, [staffId]: attendance };
      const records = Object.values(updatedMap);
      return {
        ...state,
        attendanceMap: updatedMap,
        attendanceSummary: {
          total: state.staff.length,
          present: records.filter(a => a?.status === "present").length,
          late: records.filter(a => a?.status === "late").length,
          halfDay: records.filter(a => a?.status === "half_day").length,
          absent: records.filter(a => a?.status === "absent" || a?.status === "leave").length,
        }
      };
    }
    default: return state;
  }
}
const DashboardContext = createContext(null);
export const DashboardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);
  const [isApiLoading, setIsApiLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const loadFromBackend = useCallback(async () => {
    const token = localStorage.getItem("vexora_token");
    if (!token) { setIsApiLoading(false); return; }

    try {
      const [overviewRes, queueRes, appointmentsRes, servicesRes, staffRes, inventoryRes, reviewsRes, couponsRes, customersRes, attendanceRes] = await Promise.allSettled([
        dashboardApi.getOverview(), dashboardApi.getQueue(), dashboardApi.getAppointments({ limit: 50 }),
        dashboardApi.getServices(), dashboardApi.getStaff(), dashboardApi.getInventory(),
        dashboardApi.getReviews(), dashboardApi.getCoupons(), dashboardApi.getCustomers({ limit: 100 }),
        dashboardApi.getTodayAttendance(),
      ]);
      const ok = r => r.status === "fulfilled";
      const services = ok(servicesRes) ? servicesRes.value.data.services.map(s => ({ id: s.serviceId, name: s.serviceName, category: s.category, duration: s.duration, price: s.price, available: s.status === "active" })) : initialState.services;
      const staff = ok(staffRes) ? staffRes.value.data.staff.map(s => ({ id: s.staffId, staffId: s.staffId, name: s.name, initials: s.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase(), role: s.role.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()), status: s.status === "active" ? "available" : "break", assignedServices: s.assignedServices || [], todayClients: 0, shift: s.schedule?.monday || "09:00-18:00", rating: 4.8, phone: s.phone, email: s.email })) : initialState.staff;
      const queue = ok(queueRes) ? queueRes.value.data.queue.map((q, i) => ({
        id: q.appointmentId,
        appointmentId: q.appointmentId,
        pos: q.queuePosition || i + 1,
        customer: q.customerName || q.customerId,
        customerName: q.customerName || q.customerId,
        initials: (q.customerName || q.customerId).slice(0, 2).toUpperCase(),
        service: q.serviceName || q.serviceId,
        staff: q.staffName || q.staffId || "Any Stylist",
        assignedStaff: q.staffName || q.staffId || "Any Stylist",
        status: q.status === "in_service" ? "in-service" : q.status === "completed" ? "completed" : q.status === "cancelled" ? "cancelled" : "waiting",
        queuePosition: q.queuePosition || i + 1,
        phone: q.phone || "",
        time: q.startTime || "10:00 AM",
        eta: q.estimatedWaitTime || 0,
        estimatedWait: q.estimatedWaitTime || 15,
        duration: 30,
        elapsed: 0
      })) : initialState.queue;
      const appointments = ok(appointmentsRes) ? appointmentsRes.value.data.appointments.map(a => ({
        id: a.appointmentId,
        appointmentId: a.appointmentId,
        customer: a.customerName || a.customerId,
        customerName: a.customerName || a.customerId,
        phone: a.phone || "",
        initials: (a.customerName || a.customerId || "G").slice(0, 2).toUpperCase(),
        service: a.serviceName || a.serviceId || "Salon Service",
        staff: a.staffName || a.staffId || "Any Stylist",
        date: new Date(a.appointmentDate).toDateString() === new Date().toDateString() ? "Today" : new Date(a.appointmentDate).toLocaleDateString(),
        time: a.startTime,
        status: a.status,
        duration: a.duration || 30
      })) : initialState.appointments;
      const inventory = ok(inventoryRes) ? inventoryRes.value.data.inventory.map(item => ({ id: item.inventoryId, name: item.productName, category: item.category, stock: item.quantity, usedToday: 0, reorderAt: item.lowStockThreshold, unit: item.unit })) : initialState.inventory;
      const reviews = ok(reviewsRes) ? reviewsRes.value.data.reviews.map(r => ({ id: r.reviewId, customer: r.customerId, initials: r.customerId.slice(0, 2).toUpperCase(), rating: r.rating, comment: r.comment, service: r.serviceId, date: new Date(r.createdAt).toLocaleDateString(), reply: r.managerResponse, status: r.status })) : initialState.reviews;
      const coupons = ok(couponsRes) ? couponsRes.value.data.coupons.map(c => ({ id: c.couponId, code: c.code, type: c.discountType, value: c.discountValue, minOrder: c.minimumAmount, expiry: new Date(c.validUntil).toLocaleDateString(), used: c.usedCount, active: c.status === "active", description: c.discountType === "percentage" ? `${c.discountValue}% off` : `Rs ${c.discountValue} off` })) : initialState.coupons;
      const customers = ok(customersRes) ? customersRes.value.data.customers.map(c => ({ id: c.customerId, name: c.name, initials: c.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase(), phone: c.phone, email: c.email, visits: c.visits ?? 1, lastVisit: c.lastVisit || (c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "N/A"), totalSpent: Number(c.totalSpent ?? c.totalSpend ?? 0), totalSpend: Number(c.totalSpent ?? c.totalSpend ?? 0), tier: c.tier || "Regular", favService: c.favService || "Salon Service" })) : initialState.customers;
      const attendanceMap = ok(attendanceRes) ? (attendanceRes.value.data?.attendanceMap || {}) : {};
      const attendanceSummary = ok(attendanceRes) ? (attendanceRes.value.data?.summary || { total: staff.length, present: 0, late: 0, halfDay: 0, absent: 0 }) : { total: staff.length, present: 0, late: 0, halfDay: 0, absent: 0 };
      const overview = ok(overviewRes) ? overviewRes.value.data : null;

      dispatch({
        type: "LOAD_FROM_API",
        payload: {
          queue,
          appointments,
          services,
          staff,
          inventory,
          reviews,
          coupons,
          customers,
          attendanceMap,
          attendanceSummary,
          completedToday: overview?.kpis?.completedToday ?? initialState.completedToday,
          revenueToday: overview?.kpis?.revenueToday ?? 0,
          transactionsToday: overview?.kpis?.transactionsToday ?? 0,
        }
      });
    } catch (err) {
      console.warn("[VEXORA] API bootstrap failed, using mock data.", err.message);
      setApiError(err.message);
    } finally { setIsApiLoading(false); }
  }, []);

  useEffect(() => {
    loadFromBackend();

    // Join manager salon room if available
    try {
      const storedMgr = localStorage.getItem("vexora_manager");
      if (storedMgr) {
        const mgr = JSON.parse(storedMgr);
        if (mgr.salonId) joinSalonRoom(mgr.salonId);
      }
    } catch {}

    // Socket.IO real-time event listeners
    const handleRealtimeUpdate = () => {
      loadFromBackend();
    };

    socket.on("queue:updated", handleRealtimeUpdate);
    socket.on("queue:created", handleRealtimeUpdate);
    socket.on("queue:started", handleRealtimeUpdate);
    socket.on("queue:completed", handleRealtimeUpdate);
    socket.on("queue:cancelled", handleRealtimeUpdate);

    return () => {
      socket.off("queue:updated", handleRealtimeUpdate);
      socket.off("queue:created", handleRealtimeUpdate);
      socket.off("queue:started", handleRealtimeUpdate);
      socket.off("queue:completed", handleRealtimeUpdate);
      socket.off("queue:cancelled", handleRealtimeUpdate);
    };
  }, [loadFromBackend]);

  const startService = useCallback((id, customerName) => {
    dispatch({ type: "START_SERVICE", id, customerName });
    dashboardApi.startService(id).catch(console.warn);
  }, []);

  const completeService = useCallback((id) => {
    dispatch({ type: "COMPLETE_SERVICE", id });
    dashboardApi.completeService(id).catch(console.warn);
  }, []);

  const cancelService = useCallback((id) => {
    dispatch({ type: "CANCEL_SERVICE", id });
    dashboardApi.cancelQueue(id).catch(console.warn);
  }, []);

  const moveUp = useCallback((id) => {
    dispatch({ type: "MOVE_UP", id });
    dashboardApi.moveUp(id).catch(console.warn);
  }, []);

  const addCustomer = useCallback((customer, service, staff) => {
    dispatch({ type: "ADD_CUSTOMER", customer, service, staff });
    dashboardApi.joinQueue(customer, service, staff).catch(console.warn);
  }, []);

  const updateStock = useCallback((id, delta) => { dispatch({ type: "UPDATE_STOCK", id, delta }); dashboardApi.updateStock(id, delta).catch(console.warn); }, []);
  const toggleService = useCallback((id) => { dispatch({ type: "TOGGLE_SERVICE", id }); }, []);
  const addService = useCallback((data) => { dispatch({ type: "ADD_SERVICE", ...data }); dashboardApi.createService({ serviceName: data.name, category: data.category, price: data.price, duration: data.duration }).catch(console.warn); }, []);
  const toggleCoupon = useCallback((id) => { dispatch({ type: "TOGGLE_COUPON", id }); dashboardApi.toggleCoupon(id).catch(console.warn); }, []);
  const addCoupon = useCallback((data) => { dispatch({ type: "ADD_COUPON", ...data }); dashboardApi.createCoupon({ code: data.code, discountType: data.couponType, discountValue: data.value, minimumAmount: data.minOrder, validFrom: new Date().toISOString(), validUntil: data.expiry }).catch(console.warn); }, []);
  const toggleStaffStatus = useCallback((id) => dispatch({ type: "TOGGLE_STAFF_STATUS", id }), []);

  const addStaff = useCallback(async (data) => {
    try {
      const res = await dashboardApi.createStaff(data);
      if (res.data?.staff) {
        const s = res.data.staff;
        const formatted = {
          id: s.staffId,
          staffId: s.staffId,
          name: s.name,
          initials: s.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase(),
          role: s.role.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
          status: s.status === "active" ? "available" : "break",
          assignedServices: s.assignedServices || [],
          todayClients: 0,
          shift: s.schedule?.monday || "09:00-18:00",
          rating: 5.0,
          phone: s.phone,
          email: s.email
        };
        dispatch({ type: "ADD_STAFF", payload: formatted });
        return { success: true, staff: formatted };
      }
    } catch (err) {
      console.error("Add staff failed:", err);
      throw err;
    }
  }, []);

  const removeStaff = useCallback(async (staffId) => {
    try {
      await dashboardApi.deleteStaff(staffId);
      dispatch({ type: "REMOVE_STAFF", id: staffId });
      return { success: true };
    } catch (err) {
      console.error("Remove staff failed:", err);
      throw err;
    }
  }, []);

  const markAttendance = useCallback(async (staffId, status, notes = "") => {
    try {
      const res = await dashboardApi.markAttendance({ staffId, status, notes });
      if (res.data?.attendance) {
        dispatch({
          type: "UPDATE_ATTENDANCE",
          payload: { staffId, attendance: res.data.attendance }
        });
      }
      return { success: true };
    } catch (err) {
      console.error("Mark attendance failed:", err);
      throw err;
    }
  }, []);

  return (
    <DashboardContext.Provider value={{
      ...state,
      isApiLoading,
      apiError,
      startService,
      completeService,
      cancelService,
      moveUp,
      addCustomer,
      updateStock,
      toggleService,
      addService,
      toggleCoupon,
      addCoupon,
      toggleStaffStatus,
      addStaff,
      removeStaff,
      markAttendance,
      refreshData: loadFromBackend,
    }}>
      {children}
    </DashboardContext.Provider>
  );
};
export const useDashboard = () => {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be within DashboardProvider");
  return ctx;
};