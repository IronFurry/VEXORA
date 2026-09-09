const dotenv = require("dotenv");
const connectDB = require("../config/db");
const Payment = require("../models/Payment");
const Appointment = require("../models/Appointment");
const Manager = require("../models/Manager");
const Staff = require("../models/Staff");
const StaffAttendance = require("../models/StaffAttendance");

dotenv.config();

const run = async () => {
  try {
    await connectDB();
    const salonId = "SAL-PLG-002";

    // 1. Update Manager permissions
    await Manager.findOneAndUpdate(
      { email: "vasai@vexora.com" },
      {
        permissions: [
          "view_analytics",
          "manage_staff",
          "manage_services",
          "manage_appointments",
          "view_payments",
          "manage_inventory",
          "manage_coupons",
          "manage_reviews"
        ]
      }
    );
    console.log("Manager permissions updated.");

    // 2. Backfill payments for existing completed appointments
    const completedApts = await Appointment.find({ salonId, status: "completed" });
    for (const apt of completedApts) {
      let p = await Payment.findOne({ appointmentId: apt.appointmentId });
      if (!p) {
        const count = await Payment.countDocuments();
        const pId = "PAY-PLG-" + String(count + 1).padStart(3, "0") + "-" + Date.now().toString().slice(-4);
        p = await Payment.create({
          paymentId: pId,
          appointmentId: apt.appointmentId,
          customerId: apt.customerId || "CUST-PLG-001",
          salonId,
          amount: apt.price || 450,
          paymentGateway: "cash",
          paymentMethod: "cash",
          status: "paid",
          paymentTime: apt.appointmentDate || new Date()
        });
        apt.paymentId = pId;
        await apt.save();
        console.log("Created payment for", apt.appointmentId);
      }
    }

    // 3. Add a few more completed services today to give a rich revenue baseline
    const now = new Date();
    const todayServices = [
      { cust: "Aarav Sharma", srv: "SRV-HC-01-SAL-PLG-002", name: "Precision Haircut", price: 250, staff: "STF-PLG-04" },
      { cust: "Tanvi Joshi", srv: "SRV-CL-01-SAL-PLG-002", name: "Couture Hair Coloring", price: 900, staff: "STF-PLG-05" },
      { cust: "Rohan Deshmukh", srv: "SRV-SP-01-SAL-PLG-002", name: "Nourishing Hair Spa", price: 700, staff: "STF-PLG-05" },
      { cust: "Kunal Varma", srv: "SRV-BT-01-SAL-PLG-002", name: "Beard Trim & Sculpting", price: 150, staff: "STF-PLG-04" },
      { cust: "Devendra Patil", srv: "SRV-FC-01-SAL-PLG-002", name: "Executive Facial Therapy", price: 500, staff: "STF-PLG-04" },
    ];

    for (let i = 0; i < todayServices.length; i++) {
      const ts = todayServices[i];
      const aptId = "APT-PLG-002-TD" + (i + 1);
      const existing = await Appointment.findOne({ appointmentId: aptId });
      if (!existing) {
        const aptDate = new Date(now.getTime() - (i + 1) * 3600 * 1000);
        await Appointment.create({
          appointmentId: aptId,
          customerId: "CUST-PLG-0" + (i + 10),
          salonId,
          serviceId: ts.srv,
          staffId: ts.staff,
          appointmentDate: aptDate,
          startTime: "1" + i + ":00",
          endTime: "1" + i + ":30",
          bookingType: "appointment",
          price: ts.price,
          status: "completed"
        });

        await Payment.create({
          paymentId: "PAY-PLG-TD-" + (i + 1),
          appointmentId: aptId,
          customerId: "CUST-PLG-0" + (i + 10),
          salonId,
          amount: ts.price,
          paymentGateway: "razorpay",
          paymentMethod: "upi",
          status: "paid",
          paymentTime: aptDate
        });
        console.log("Seeded today appointment & payment:", ts.name, ts.price);
      }
    }

    // 4. Seed past 6 days payments so 7-day analytics chart has real data
    for (let d = 1; d <= 6; d++) {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - d);
      pastDate.setHours(12, 0, 0, 0);

      const pastAptId = "APT-PLG-PAST-" + d;
      const existPast = await Appointment.findOne({ appointmentId: pastAptId });
      if (!existPast) {
        const amt = 1800 + d * 350;
        await Appointment.create({
          appointmentId: pastAptId,
          customerId: "CUST-PLG-PAST-" + d,
          salonId,
          serviceId: "SRV-CL-01-SAL-PLG-002",
          staffId: "STF-PLG-04",
          appointmentDate: pastDate,
          startTime: "14:00",
          endTime: "15:00",
          bookingType: "appointment",
          price: amt,
          status: "completed"
        });

        await Payment.create({
          paymentId: "PAY-PLG-PAST-" + d,
          appointmentId: pastAptId,
          customerId: "CUST-PLG-PAST-" + d,
          salonId,
          amount: amt,
          paymentGateway: "razorpay",
          paymentMethod: "card",
          status: "paid",
          paymentTime: pastDate
        });
      }
    }
    console.log("Past payments seeded.");

    // 5. Seed Attendance for today for Vasai staff
    const staffMembers = await Staff.find({ salonId });
    for (let i = 0; i < staffMembers.length; i++) {
      const st = staffMembers[i];
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const todayEnd = new Date();
      todayEnd.setHours(23, 59, 59, 999);

      const attExist = await StaffAttendance.findOne({
        staffId: st.staffId,
        salonId,
        date: { $gte: todayStart, $lte: todayEnd }
      });

      if (!attExist) {
        const checkIn = new Date();
        checkIn.setHours(9, 15 + i * 10, 0, 0);
        await StaffAttendance.create({
          attendanceId: "ATT-INIT-" + st.staffId,
          staffId: st.staffId,
          salonId,
          date: new Date(),
          checkIn,
          status: "present",
          notes: "Regular on-time check-in"
        });
        console.log("Seeded attendance for:", st.name);
      }
    }

    console.log("Vasai Cuts & Co setup completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
};

run();
