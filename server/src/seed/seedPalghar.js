const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const Salon = require("../models/Salon");
const Service = require("../models/Service");
const Customer = require("../models/Customer");
const Staff = require("../models/Staff");
const Manager = require("../models/Manager");
const Appointment = require("../models/Appointment");

const connectDB = require("../config/db");

dotenv.config();

/**
 * Palghar Region Seed — 5 Salons covering Palghar city, Vasai-Virar, Boisar, Dahanu & Nalasopara
 * Dashboard Login: palghar@vexora.com / Vexora@123 (SAL-PLG-001 - Aura Style Studio)
 */
const seedPalghar = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB for Palghar seed");

    const passwordHash = await bcrypt.hash("Vexora@123", 10);

    // ─── 1. Salons ────────────────────────────────────────────────────────────
    const salons = [
      {
        salonId: "SAL-PLG-001",
        salonName: "Aura Style Studio",
        ownerId: "MGR-PLG-01",
        description:
          "Palghar's premier unisex studio — precision haircuts, modern skin fades, and bridal hair packages.",
        contact: { phone: "+919876550001", email: "aura@vexora.com" },
        location: {
          type: "Point",
          coordinates: [72.7653, 19.6967], // Palghar city centre
          address: "Shop 12, Nari Road, Palghar West, Palghar - 401404",
        },
        workingHours: {
          monday: "09:00-21:00",
          tuesday: "09:00-21:00",
          wednesday: "09:00-21:00",
          thursday: "09:00-21:00",
          friday: "09:00-22:00",
          saturday: "08:00-22:00",
          sunday: "09:00-20:00",
        },
        images: [
          "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
        ],
        rating: 4.8,
        status: "active",
      },
      {
        salonId: "SAL-PLG-002",
        salonName: "Vasai Cuts & Co.",
        ownerId: "MGR-PLG-02",
        description:
          "Vasai-Virar's top barbershop — hot towel shaves, beard sculpting, and premium grooming rituals.",
        contact: { phone: "+919876550002", email: "vasaicuts@vexora.com" },
        location: {
          type: "Point",
          coordinates: [72.8155, 19.3694], // Vasai Road West
          address: "3, Station Road, Vasai West, Vasai-Virar - 401202",
        },
        workingHours: {
          monday: "09:00-21:00",
          tuesday: "09:00-21:00",
          wednesday: "09:00-21:00",
          thursday: "09:00-21:00",
          friday: "09:00-22:00",
          saturday: "08:00-22:00",
          sunday: "09:00-20:00",
        },
        images: [
          "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80",
        ],
        rating: 4.7,
        status: "active",
      },
      {
        salonId: "SAL-PLG-003",
        salonName: "Boisar Barber Republic",
        ownerId: "MGR-PLG-03",
        description:
          "Old-world barbershop craft in Boisar — classic straight razor, pomade styling, and scalp massages.",
        contact: { phone: "+919876550003", email: "boisarbarber@vexora.com" },
        location: {
          type: "Point",
          coordinates: [72.7784, 19.8033], // Boisar
          address: "Near MIDC Gate, Boisar East, Palghar - 401501",
        },
        workingHours: {
          monday: "09:00-21:00",
          tuesday: "09:00-21:00",
          wednesday: "09:00-21:00",
          thursday: "09:00-21:00",
          friday: "09:00-21:00",
          saturday: "08:00-22:00",
          sunday: "09:00-20:00",
        },
        images: [
          "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80",
        ],
        rating: 4.6,
        status: "active",
      },
      {
        salonId: "SAL-PLG-004",
        salonName: "Dahanu Glow Salon",
        ownerId: "MGR-PLG-04",
        description:
          "Dahanu's favourite beauty parlour — hair coloring, facials, bridal makeup and relaxing spa treatments.",
        contact: { phone: "+919876550004", email: "dahanuglow@vexora.com" },
        location: {
          type: "Point",
          coordinates: [72.7196, 19.9631], // Dahanu Road
          address: "Opp. Dahanu Bus Stand, Dahanu Road, Palghar - 401601",
        },
        workingHours: {
          monday: "09:00-20:00",
          tuesday: "09:00-20:00",
          wednesday: "09:00-20:00",
          thursday: "09:00-20:00",
          friday: "09:00-21:00",
          saturday: "08:00-21:00",
          sunday: "10:00-19:00",
        },
        images: [
          "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
        ],
        rating: 4.5,
        status: "active",
      },
      {
        salonId: "SAL-PLG-005",
        salonName: "Nalasopara Glam Studio",
        ownerId: "MGR-PLG-05",
        description:
          "Nalasopara's modern unisex glam studio — keratin, balayage, express grooming, and nail art.",
        contact: { phone: "+919876550005", email: "nalasoparaGlam@vexora.com" },
        location: {
          type: "Point",
          coordinates: [72.8300, 19.4138], // Nalasopara East
          address: "14, Achole Road, Nalasopara East, Vasai-Virar - 401209",
        },
        workingHours: {
          monday: "09:00-21:00",
          tuesday: "09:00-21:00",
          wednesday: "09:00-21:00",
          thursday: "09:00-21:00",
          friday: "09:00-22:00",
          saturday: "08:00-22:00",
          sunday: "10:00-20:00",
        },
        images: [
          "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=800&q=80",
        ],
        rating: 4.7,
        status: "active",
      },
    ];

    for (const s of salons) {
      await Salon.findOneAndUpdate({ salonId: s.salonId }, s, { upsert: true, new: true });
    }
    console.log("Salons upserted");

    // ─── 2. Managers ─────────────────────────────────────────────────────────
    const managers = [
      {
        managerId: "MGR-PLG-01",
        salonId: "SAL-PLG-001",
        name: "Rakesh Patil",
        phone: "+919800000101",
        email: "palghar@vexora.com",
        passwordHash,
        role: "owner",
        permissions: [
          "view_analytics", "manage_staff", "manage_inventory",
          "manage_services", "manage_coupons", "manage_reviews",
          "manage_appointments", "view_payments",
        ],
        status: "active",
      },
      {
        managerId: "MGR-PLG-02",
        salonId: "SAL-PLG-002",
        name: "Suresh Naik",
        phone: "+919800000102",
        email: "vasai@vexora.com",
        passwordHash,
        role: "owner",
        permissions: [
          "view_analytics", "manage_staff", "manage_services",
          "manage_appointments", "view_payments",
        ],
        status: "active",
      },
    ];

    for (const m of managers) {
      await Manager.findOneAndUpdate({ managerId: m.managerId }, m, { upsert: true, new: true });
    }
    console.log("Managers upserted");

    // ─── 3. Services ─────────────────────────────────────────────────────────
    const serviceTemplates = [
      { serviceId: "SRV-HC-01", serviceName: "Precision Haircut", category: "Haircut", price: 250, duration: 30 },
      { serviceId: "SRV-BT-01", serviceName: "Beard Trim & Sculpting", category: "Beard", price: 150, duration: 20 },
      { serviceId: "SRV-FC-01", serviceName: "Executive Facial Therapy", category: "Facial", price: 500, duration: 45 },
      { serviceId: "SRV-CL-01", serviceName: "Couture Hair Coloring", category: "Hair Color", price: 900, duration: 60 },
      { serviceId: "SRV-SP-01", serviceName: "Nourishing Hair Spa", category: "Hair Spa", price: 700, duration: 45 },
      { serviceId: "SRV-ST-01", serviceName: "Texture & Blowdry Styling", category: "Styling", price: 300, duration: 25 },
    ];

    const plgSalonIds = salons.map((s) => s.salonId);
    for (const salonId of plgSalonIds) {
      for (const srv of serviceTemplates) {
        await Service.findOneAndUpdate(
          { serviceId: `${srv.serviceId}-${salonId}`, salonId },
          { ...srv, serviceId: `${srv.serviceId}-${salonId}`, salonId, status: "active" },
          { upsert: true, new: true }
        );
      }
    }
    console.log("Services upserted");

    // ─── 4. Staff / Stylists ──────────────────────────────────────────────────
    const stylists = [
      // Aura Style Studio (SAL-PLG-001)
      {
        staffId: "STF-PLG-01",
        salonId: "SAL-PLG-001",
        name: "Priya Desai",
        phone: "+919811200001",
        email: "priya@aurastylepalghar.com",
        role: "hair_stylist",
        specialization: ["Precision Haircut", "Balayage", "Keratin Treatment"],
        assignedServices: ["SRV-HC-01-SAL-PLG-001", "SRV-CL-01-SAL-PLG-001", "SRV-SP-01-SAL-PLG-001"],
        rating: 4.9,
        status: "active",
      },
      {
        staffId: "STF-PLG-02",
        salonId: "SAL-PLG-001",
        name: "Rahul Gavit",
        phone: "+919811200002",
        email: "rahul@aurastylepalghar.com",
        role: "barber",
        specialization: ["Skin Fade", "Beard Sculpting", "Hot Towel Shave"],
        assignedServices: ["SRV-HC-01-SAL-PLG-001", "SRV-BT-01-SAL-PLG-001"],
        rating: 4.8,
        status: "active",
      },
      {
        staffId: "STF-PLG-03",
        salonId: "SAL-PLG-001",
        name: "Sneha Warke",
        phone: "+919811200003",
        email: "sneha@aurastylepalghar.com",
        role: "beautician",
        specialization: ["Executive Facial", "Nail Art", "Threading"],
        assignedServices: ["SRV-FC-01-SAL-PLG-001", "SRV-ST-01-SAL-PLG-001"],
        rating: 4.7,
        status: "active",
      },
      // Vasai Cuts (SAL-PLG-002)
      {
        staffId: "STF-PLG-04",
        salonId: "SAL-PLG-002",
        name: "Mahesh More",
        phone: "+919811200004",
        email: "mahesh@vasaicuts.com",
        role: "barber",
        specialization: ["Classic Cut", "Beard Line-Up", "Pomade Styling"],
        assignedServices: ["SRV-HC-01-SAL-PLG-002", "SRV-BT-01-SAL-PLG-002"],
        rating: 4.7,
        status: "active",
      },
      {
        staffId: "STF-PLG-05",
        salonId: "SAL-PLG-002",
        name: "Kavita Shinde",
        phone: "+919811200005",
        email: "kavita@vasaicuts.com",
        role: "hair_stylist",
        specialization: ["Global Hair Color", "Hair Spa", "Blowdry"],
        assignedServices: ["SRV-CL-01-SAL-PLG-002", "SRV-SP-01-SAL-PLG-002", "SRV-ST-01-SAL-PLG-002"],
        rating: 4.8,
        status: "active",
      },
      // Boisar (SAL-PLG-003)
      {
        staffId: "STF-PLG-06",
        salonId: "SAL-PLG-003",
        name: "Vikas Bhoir",
        phone: "+919811200006",
        email: "vikas@boisarbarber.com",
        role: "barber",
        specialization: ["Straight Razor Shave", "Skin Fade", "Scalp Massage"],
        assignedServices: ["SRV-HC-01-SAL-PLG-003", "SRV-BT-01-SAL-PLG-003"],
        rating: 4.6,
        status: "active",
      },
      // Dahanu (SAL-PLG-004)
      {
        staffId: "STF-PLG-07",
        salonId: "SAL-PLG-004",
        name: "Alka Koli",
        phone: "+919811200007",
        email: "alka@dahanuglow.com",
        role: "beautician",
        specialization: ["Bridal Makeup", "Facial Therapy", "Hair Coloring"],
        assignedServices: ["SRV-FC-01-SAL-PLG-004", "SRV-CL-01-SAL-PLG-004", "SRV-SP-01-SAL-PLG-004"],
        rating: 4.8,
        status: "active",
      },
      // Nalasopara (SAL-PLG-005)
      {
        staffId: "STF-PLG-08",
        salonId: "SAL-PLG-005",
        name: "Amit Thakur",
        phone: "+919811200008",
        email: "amit@nalasoparaglam.com",
        role: "hair_stylist",
        specialization: ["Keratin Treatment", "Balayage", "Hair Spa"],
        assignedServices: ["SRV-CL-01-SAL-PLG-005", "SRV-SP-01-SAL-PLG-005", "SRV-ST-01-SAL-PLG-005"],
        rating: 4.7,
        status: "active",
      },
      {
        staffId: "STF-PLG-09",
        salonId: "SAL-PLG-005",
        name: "Ritu Yadav",
        phone: "+919811200009",
        email: "ritu@nalasoparaglam.com",
        role: "beautician",
        specialization: ["Nail Art", "Waxing", "Threading", "Eyebrow Design"],
        assignedServices: ["SRV-FC-01-SAL-PLG-005", "SRV-ST-01-SAL-PLG-005"],
        rating: 4.6,
        status: "active",
      },
    ];

    for (const st of stylists) {
      await Staff.findOneAndUpdate({ staffId: st.staffId }, st, { upsert: true, new: true });
    }
    console.log("Stylists upserted");

    // ─── 5. Active Queue for Aura Style Studio ──────────────────────────────
    const today = new Date();
    const demoQueue = [
      {
        appointmentId: "APT-PLG-001-Q1",
        customerId: "CUST-PLG-001",
        salonId: "SAL-PLG-001",
        serviceId: "SRV-HC-01-SAL-PLG-001",
        staffId: "STF-PLG-02",
        appointmentDate: today,
        startTime: "10:00",
        endTime: "10:30",
        bookingType: "queue",
        queuePosition: 1,
        estimatedWaitTime: 5,
        price: 250,
        status: "in_service",
        checkIn: { status: "checked_in", checkedInAt: new Date(Date.now() - 10 * 60000) },
      },
      {
        appointmentId: "APT-PLG-001-Q2",
        customerId: "CUST-PLG-002",
        salonId: "SAL-PLG-001",
        serviceId: "SRV-BT-01-SAL-PLG-001",
        staffId: "STF-PLG-01",
        appointmentDate: today,
        startTime: "10:15",
        endTime: "10:35",
        bookingType: "queue",
        queuePosition: 2,
        estimatedWaitTime: 15,
        price: 150,
        status: "waiting",
      },
      {
        appointmentId: "APT-PLG-001-Q3",
        customerId: "CUST-PLG-003",
        salonId: "SAL-PLG-001",
        serviceId: "SRV-FC-01-SAL-PLG-001",
        staffId: "STF-PLG-03",
        appointmentDate: today,
        startTime: "10:30",
        endTime: "11:15",
        bookingType: "queue",
        queuePosition: 3,
        estimatedWaitTime: 28,
        price: 500,
        status: "waiting",
      },
    ];

    for (const q of demoQueue) {
      await Appointment.findOneAndUpdate({ appointmentId: q.appointmentId }, q, { upsert: true, new: true });
    }
    console.log("Active queue seeded for Aura Style Studio (Palghar)");

    console.log("\nPalghar region seeding complete!");
    console.log("  Dashboard Login: palghar@vexora.com / Vexora@123");
    process.exit(0);
  } catch (err) {
    console.error("Palghar seed error:", err);
    process.exit(1);
  }
};

seedPalghar();
