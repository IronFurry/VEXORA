import React, { createContext, useContext, useReducer, useCallback } from "react";

// --- Mock Data ----------------------------------------------------------------

export const MOCK_STAFF = [
  { id: 1, name: "Vikram Sharma", initials: "VS", role: "Senior Stylist", status: "in-service", assignedServices: ["Precision Fade","Beard Trim","Hot Towel Shave"], todayClients: 8, shift: "9:00 AM – 6:00 PM", rating: 4.9 },
  { id: 2, name: "Anita Rao", initials: "AR", role: "Colour Specialist", status: "available", assignedServices: ["Hair Colour","Highlights","Balayage","Keratin"], todayClients: 5, shift: "10:00 AM – 7:00 PM", rating: 4.8 },
  { id: 3, name: "Sameer Khan", initials: "SK", role: "Stylist", status: "in-service", assignedServices: ["Scissor Cut","Scalp Treatment","Hair Spa"], todayClients: 6, shift: "9:00 AM – 5:00 PM", rating: 4.7 },
  { id: 4, name: "Kunal Patel", initials: "KP", role: "Junior Stylist", status: "available", assignedServices: ["Basic Cut","Beard Trim","Face Cleanup"], todayClients: 4, shift: "11:00 AM – 8:00 PM", rating: 4.6 },
  { id: 5, name: "Priya Mehta", initials: "PM", role: "Skin Specialist", status: "break", assignedServices: ["Face Cleanup","Facial","Head Massage"], todayClients: 3, shift: "10:00 AM – 6:00 PM", rating: 4.8 },
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
  { id: 3, name: "L'Oreal Keratin Serum", category: "Treatment", stock: 8, usedToday: 2, reorderAt: 4, unit: "bottles" },
  { id: 4, name: "Barbicide Disinfectant", category: "Hygiene", stock: 2, usedToday: 1, reorderAt: 3, unit: "liters" },
  { id: 5, name: "Disposable Neck Strips", category: "Hygiene", stock: 240, usedToday: 23, reorderAt: 50, unit: "pieces" },
  { id: 6, name: "Hot Towel Roll", category: "Hygiene", stock: 12, usedToday: 5, reorderAt: 6, unit: "rolls" },
  { id: 7, name: "Schwarzkopf Shampoo", category: "Retail", stock: 18, usedToday: 4, reorderAt: 6, unit: "bottles" },
  { id: 8, name: "Pomade (Matte Finish)", category: "Retail", stock: 7, usedToday: 2, reorderAt: 5, unit: "jars" },
];

export const MOCK_REVIEWS = [
  { id: 1, customer: "Rahul Mehta", initials: "RM", rating: 5, service: "Precision Fade", staff: "Vikram Sharma", date: "Sep 07, 2026", text: "Vikram is hands down the best barber I've visited. The fade was clean, sharp, and exactly what I wanted. VEXORA made the booking seamless.", helpful: 12 },
  { id: 2, customer: "Aryan Singh", initials: "AS", rating: 5, service: "Hot Towel Shave", staff: "Sameer Khan", date: "Sep 06, 2026", text: "The hot towel shave experience was incredible. Sameer's technique is flawless. Zero nicks, incredibly smooth. Will return every week.", helpful: 9 },
  { id: 3, customer: "Nisha Patel", initials: "NP", rating: 4, service: "Balayage", staff: "Anita Rao", date: "Sep 05, 2026", text: "Anita understood my vision perfectly. The balayage came out beautifully natural. Only minor issue was the wait time was slightly longer than expected.", helpful: 7 },
  { id: 4, customer: "Devika Nair", initials: "DN", rating: 5, service: "Premium Facial", staff: "Priya Mehta", date: "Sep 04, 2026", text: "Priya is an absolute expert. My skin has never looked better. The facial was deeply relaxing and therapeutic.", helpful: 15 },
  { id: 5, customer: "Karan Gupta", initials: "KG", rating: 3, service: "Classic Scissor Cut", staff: "Kunal Patel", date: "Sep 03, 2026", text: "The cut was decent but could have been more precise on the sides. Kunal is still developing his skills. Salon ambience is excellent though.", helpful: 3 },
];

export const MOCK_COUPONS = [
  { id: 1, code: "VEXFIRST20", type: "percentage", value: 20, minOrder: 500, expiry: "Sep 30, 2026", used: 34, active: true, description: "First-time customer discount" },
  { id: 2, code: "WEEKEND150", type: "fixed", value: 150, minOrder: 800, expiry: "Sep 14, 2026", used: 18, active: true, description: "Weekend special flat discount" },
  { id: 3, code: "LOYALTY10", type: "percentage", value: 10, minOrder: 0, expiry: "Dec 31, 2026", used: 89, active: true, description: "Returning customer loyalty code" },
  { id: 4, code: "MONSOON25", type: "percentage", value: 25, minOrder: 1000, expiry: "Aug 31, 2026", used: 56, active: false, description: "Monsoon season offer (expired)" },
];

export const MOCK_CUSTOMERS = [
  { id: 1, name: "Rahul Mehta", initials: "RM", visits: 14, lastVisit: "Sep 07, 2026", totalSpent: 9800, favService: "Precision Fade", type: "returning", phone: "+91 98765 43210" },
  { id: 2, name: "Aryan Singh", initials: "AS", visits: 8, lastVisit: "Sep 06, 2026", totalSpent: 5400, favService: "Hot Towel Shave", type: "returning", phone: "+91 87654 32109" },
  { id: 3, name: "Karan Gupta", initials: "KG", visits: 1, lastVisit: "Sep 03, 2026", totalSpent: 550, favService: "Scissor Cut", type: "new", phone: "+91 76543 21098" },
  { id: 4, name: "Nisha Patel", initials: "NP", visits: 5, lastVisit: "Sep 05, 2026", totalSpent: 14500, favService: "Balayage", type: "returning", phone: "+91 65432 10987" },
  { id: 5, name: "Devika Nair", initials: "DN", visits: 9, lastVisit: "Sep 04, 2026", totalSpent: 13500, favService: "Premium Facial", type: "returning", phone: "+91 54321 09876" },
  { id: 6, name: "Sameer Ali", initials: "SA", visits: 1, lastVisit: "Sep 08, 2026", totalSpent: 650, favService: "Precision Fade", type: "new", phone: "+91 43210 98765" },
  { id: 7, name: "Pooja Sharma", initials: "PS", visits: 3, lastVisit: "Aug 28, 2026", totalSpent: 4500, favService: "Hair Spa", type: "returning", phone: "+91 32109 87654" },
];

const initQueue = [
  { id: "Q-001", pos: 1, customer: "Sameer Ali", initials: "SA", service: "Precision Fade", staff: "Vikram Sharma", status: "in-service", eta: 0, duration: 30, elapsed: 8 },
  { id: "Q-002", pos: 2, customer: "Rahul Mehta", initials: "RM", service: "Hot Towel Shave", staff: "Sameer Khan", status: "in-service", eta: 12, duration: 30, elapsed: 18 },
  { id: "Q-003", pos: 3, customer: "Priya Gupta", initials: "PG", service: "Hair Colour", staff: "Anita Rao", status: "in-service", eta: 22, duration: 90, elapsed: 68 },
  { id: "Q-004", pos: 4, customer: "Karan Mehta", initials: "KM", service: "Beard Trim", staff: "Kunal Patel", status: "waiting", eta: 35, duration: 20, elapsed: 0 },
  { id: "Q-005", pos: 5, customer: "Devika Nair", initials: "DN", service: "Scalp Treatment", staff: "Priya Mehta", status: "waiting", eta: 52, duration: 45, elapsed: 0 },
  { id: "Q-006", pos: 6, customer: "Aditya Roy", initials: "AR", service: "Classic Cut", staff: "Vikram Sharma", status: "waiting", eta: 68, duration: 40, elapsed: 0 },
];

const initAppointments = [
  { id: "APT-101", customer: "Nisha Patel", initials: "NP", service: "Balayage", staff: "Anita Rao", date: "Today", time: "2:00 PM", status: "confirmed", duration: 120 },
  { id: "APT-102", customer: "Ravi Kumar", initials: "RK", service: "Hair Spa", staff: "Sameer Khan", date: "Today", time: "3:30 PM", status: "confirmed", duration: 60 },
  { id: "APT-103", customer: "Sneha Joshi", initials: "SJ", service: "Premium Facial", staff: "Priya Mehta", date: "Today", time: "4:00 PM", status: "pending", duration: 60 },
  { id: "APT-104", customer: "Amit Desai", initials: "AD", service: "Precision Fade", staff: "Vikram Sharma", date: "Tomorrow", time: "10:00 AM", status: "confirmed", duration: 30 },
  { id: "APT-105", customer: "Pooja Sharma", initials: "PS", service: "Keratin Treatment", staff: "Anita Rao", date: "Tomorrow", time: "11:30 AM", status: "confirmed", duration: 90 },
  { id: "APT-106", customer: "Deepak Nair", initials: "DN", service: "Classic Scissor Cut", staff: "Kunal Patel", date: "Sep 10", time: "9:00 AM", status: "pending", duration: 40 },
];

const initialState = {
  queue: initQueue,
  appointments: initAppointments,
  customers: MOCK_CUSTOMERS,
  staff: MOCK_STAFF,
  services: MOCK_SERVICES,
  inventory: MOCK_INVENTORY,
  reviews: MOCK_REVIEWS,
  coupons: MOCK_COUPONS,
  completedToday: 23,
  revenueToday: 18400,
  notifications: [
    { id: 1, text: "Sameer Ali joined the queue", time: "2 min ago", type: "join" },
    { id: 2, text: "Precision Fade started — Vikram", time: "8 min ago", type: "start" },
    { id: 3, text: "Appointment confirmed: Nisha Patel 2:00 PM", time: "12 min ago", type: "appt" },
    { id: 4, text: "Customer #Q-099 completed service", time: "18 min ago", type: "complete" },
    { id: 5, text: "Low stock alert: Moroccan Oil (3 left)", time: "1 hr ago", type: "alert" },
  ],
};

function recalcEtas(queue) {
  let cumEta = 0;
  return queue.map((entry) => {
    if (entry.status === "in-service") {
      const remaining = Math.max(0, entry.duration - entry.elapsed);
      return { ...entry, eta: remaining };
    }
    const prev = queue.filter(q => q.pos < entry.pos && q.status !== "cancelled");
    const eta = prev.reduce((sum, q) => sum + Math.max(0, q.duration - (q.elapsed || 0)), 0);
    return { ...entry, eta };
  });
}

function dashboardReducer(state, action) {
  switch (action.type) {
    case "START_SERVICE": {
      const updated = state.queue.map(q =>
        q.id === action.id ? { ...q, status: "in-service", elapsed: 0 } : q
      );
      const notification = { id: Date.now(), text: `${action.customerName} service started`, time: "Just now", type: "start" };
      return { ...state, queue: recalcEtas(updated), notifications: [notification, ...state.notifications].slice(0, 20) };
    }
    case "COMPLETE_SERVICE": {
      const entry = state.queue.find(q => q.id === action.id);
      const servicePrice = state.services.find(s => s.name === entry?.service)?.price || 650;
      const updated = state.queue.filter(q => q.id !== action.id).map((q, i) => ({ ...q, pos: i + 1 }));
      const notification = { id: Date.now(), text: `${entry?.customer} service completed`, time: "Just now", type: "complete" };
      return {
        ...state,
        queue: recalcEtas(updated),
        completedToday: state.completedToday + 1,
        revenueToday: state.revenueToday + servicePrice,
        notifications: [notification, ...state.notifications].slice(0, 20),
      };
    }
    case "CANCEL_SERVICE": {
      const updated = state.queue.filter(q => q.id !== action.id).map((q, i) => ({ ...q, pos: i + 1 }));
      return { ...state, queue: recalcEtas(updated) };
    }
    case "MOVE_UP": {
      const idx = state.queue.findIndex(q => q.id === action.id);
      if (idx <= 0) return state;
      const updated = [...state.queue];
      [updated[idx - 1], updated[idx]] = [updated[idx], updated[idx - 1]];
      const reindexed = updated.map((q, i) => ({ ...q, pos: i + 1 }));
      return { ...state, queue: recalcEtas(reindexed) };
    }
    case "ADD_CUSTOMER": {
      const newEntry = {
        id: `Q-${String(Date.now()).slice(-3)}`,
        pos: state.queue.length + 1,
        customer: action.customer,
        initials: action.customer.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase(),
        service: action.service,
        staff: action.staff,
        status: "waiting",
        eta: 0,
        duration: state.services.find(s => s.name === action.service)?.duration || 30,
        elapsed: 0,
      };
      const notification = { id: Date.now(), text: `${action.customer} joined the queue`, time: "Just now", type: "join" };
      return { ...state, queue: recalcEtas([...state.queue, newEntry]), notifications: [notification, ...state.notifications].slice(0, 20) };
    }
    case "UPDATE_STOCK": {
      return { ...state, inventory: state.inventory.map(item => item.id === action.id ? { ...item, stock: item.stock + action.delta } : item) };
    }
    case "TOGGLE_SERVICE": {
      return { ...state, services: state.services.map(s => s.id === action.id ? { ...s, available: !s.available } : s) };
    }
    case "ADD_SERVICE": {
      const newSvc = { id: Date.now(), name: action.name, category: action.category, duration: action.duration, price: action.price, available: true };
      return { ...state, services: [...state.services, newSvc] };
    }
    case "TOGGLE_COUPON": {
      return { ...state, coupons: state.coupons.map(c => c.id === action.id ? { ...c, active: !c.active } : c) };
    }
    case "ADD_COUPON": {
      const newCoupon = { id: Date.now(), code: action.code, type: action.couponType, value: action.value, minOrder: action.minOrder, expiry: action.expiry, used: 0, active: true, description: action.description };
      return { ...state, coupons: [...state.coupons, newCoupon] };
    }
    case "TOGGLE_STAFF_STATUS": {
      const statusCycle = { available: "break", break: "available", "in-service": "available" };
      return { ...state, staff: state.staff.map(s => s.id === action.id ? { ...s, status: statusCycle[s.status] } : s) };
    }
    default:
      return state;
  }
}

const DashboardContext = createContext(null);

export const DashboardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  const startService = useCallback((id, customerName) => dispatch({ type: "START_SERVICE", id, customerName }), []);
  const completeService = useCallback((id) => dispatch({ type: "COMPLETE_SERVICE", id }), []);
  const cancelService = useCallback((id) => dispatch({ type: "CANCEL_SERVICE", id }), []);
  const moveUp = useCallback((id) => dispatch({ type: "MOVE_UP", id }), []);
  const addCustomer = useCallback((customer, service, staff) => dispatch({ type: "ADD_CUSTOMER", customer, service, staff }), []);
  const updateStock = useCallback((id, delta) => dispatch({ type: "UPDATE_STOCK", id, delta }), []);
  const toggleService = useCallback((id) => dispatch({ type: "TOGGLE_SERVICE", id }), []);
  const addService = useCallback((data) => dispatch({ type: "ADD_SERVICE", ...data }), []);
  const toggleCoupon = useCallback((id) => dispatch({ type: "TOGGLE_COUPON", id }), []);
  const addCoupon = useCallback((data) => dispatch({ type: "ADD_COUPON", ...data }), []);
  const toggleStaffStatus = useCallback((id) => dispatch({ type: "TOGGLE_STAFF_STATUS", id }), []);

  return (
    <DashboardContext.Provider value={{
      ...state,
      startService, completeService, cancelService, moveUp, addCustomer,
      updateStock, toggleService, addService, toggleCoupon, addCoupon, toggleStaffStatus,
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
