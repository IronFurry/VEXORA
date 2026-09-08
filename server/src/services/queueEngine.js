const Appointment = require("../models/Appointment");
const Staff = require("../models/Staff");
const Service = require("../models/Service");
const Customer = require("../models/Customer");

/**
 * Calculate distance in kilometers between two coordinates using the Haversine formula
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return null;
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(1));
}

/**
 * Estimate travel time in minutes based on distance
 * Average urban speed ~ 18 km/h -> ~3.3 min/km + 2 min buffer
 */
function estimateTravelTime(distanceKm) {
  if (distanceKm == null) return 10;
  return Math.max(3, Math.round(distanceKm * 3.5 + 2));
}

/**
 * Auto-assign the best available stylist for given services and salon
 */
async function autoAssignStylist(salonId, serviceIds = []) {
  // Find all active staff in salon
  const staffList = await Staff.find({ salonId, status: "active" });
  if (!staffList.length) return null;

  // Filter staff that can perform requested services (or fallback to any active staff)
  let eligibleStaff = staffList.filter((s) => {
    if (!s.assignedServices || !s.assignedServices.length) return true;
    return serviceIds.some((srv) => s.assignedServices.includes(srv));
  });
  if (!eligibleStaff.length) eligibleStaff = staffList;

  // Check current workload (waiting or in-service appointments today)
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const staffWorkloads = await Promise.all(
    eligibleStaff.map(async (st) => {
      const activeCount = await Appointment.countDocuments({
        salonId,
        staffId: st.staffId,
        appointmentDate: { $gte: todayStart },
        status: { $in: ["waiting", "in_service"] },
      });
      return { staff: st, activeCount };
    })
  );

  // Pick stylist with least active appointments
  staffWorkloads.sort((a, b) => a.activeCount - b.activeCount);
  return staffWorkloads[0].staff;
}

/**
 * Determine queue priority score:
 * Checks how long / often the customer has visited this salon or stylist in MongoDB.
 * Returning customers with more completed visits receive a priority consideration.
 */
async function getCustomerLoyaltyScore(customerId, salonId, staffId = null) {
  if (!customerId) return 0;
  try {
    const query = {
      customerId,
      salonId,
      status: "completed",
    };
    if (staffId) {
      // Bonus if they specifically have visited this stylist before
      const stylistVisits = await Appointment.countDocuments({ ...query, staffId });
      const salonVisits = await Appointment.countDocuments(query);
      return salonVisits + stylistVisits * 2;
    }
    return await Appointment.countDocuments(query);
  } catch {
    return 0;
  }
}

/**
 * Recalculate queue positions and estimated wait times for a salon
 */
async function recalculateQueue(salonId) {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  // Fetch all active appointments for today
  const activeEntries = await Appointment.find({
    salonId,
    appointmentDate: { $gte: todayStart, $lte: todayEnd },
    status: { $in: ["waiting", "in_service"] },
  }).sort({ queuePosition: 1, createdAt: 1 });

  if (!activeEntries.length) return [];

  // Group by stylist (or global queue if unassigned)
  let currentWaitTime = 0;
  const updatedEntries = [];

  for (let i = 0; i < activeEntries.length; i++) {
    const entry = activeEntries[i];
    const newPosition = i + 1;

    let eta = 0;
    if (entry.status === "in_service") {
      // In service: calculate remaining minutes
      const elapsedMinutes = entry.checkIn?.checkedInAt
        ? Math.floor((Date.now() - new Date(entry.checkIn.checkedInAt).getTime()) / 60000)
        : 5;
      const duration = entry.price ? Math.max(15, Math.min(60, entry.price / 15)) : 30;
      eta = Math.max(0, duration - elapsedMinutes);
      currentWaitTime = eta;
    } else {
      // Waiting customer
      eta = currentWaitTime;
      const estDuration = entry.price ? Math.max(15, Math.min(60, entry.price / 15)) : 30;
      currentWaitTime += estDuration;
    }

    entry.queuePosition = newPosition;
    entry.estimatedWaitTime = Math.max(0, eta);
    await entry.save();
    updatedEntries.push(entry);
  }

  return updatedEntries;
}

module.exports = {
  calculateDistance,
  estimateTravelTime,
  autoAssignStylist,
  getCustomerLoyaltyScore,
  recalculateQueue,
};
