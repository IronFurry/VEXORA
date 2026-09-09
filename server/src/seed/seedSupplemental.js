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

const seedExpandedSalons = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB for supplemental seed");

    const passwordHash = await bcrypt.hash("Vexora@123", 10);

    const newSalons = [
      {
        salonId: "SAL-004",
        salonName: "Looks & Co. Studio",
        ownerId: "MGR-010",
        description:
          "Flagship editorial studio known for precision scissors, modern skin fades, and bespoke grooming rituals.",
        contact: {
          phone: "+919876543220",
          email: "hello@looksandco.com",
        },
        location: {
          type: "Point",
          coordinates: [77.6412, 12.9784], // Indiranagar, Bengaluru
          address: "42 Downtown 100ft Road, Indiranagar, Bengaluru",
        },
        workingHours: {
          monday: "09:00-21:00",
          tuesday: "09:00-21:00",
          wednesday: "09:00-21:00",
          thursday: "09:00-21:00",
          friday: "09:00-22:00",
          saturday: "09:00-22:00",
          sunday: "10:00-20:00",
        },
        images: [
          "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
        ],
        rating: 4.9,
        status: "active",
      },
      {
        salonId: "SAL-005",
        salonName: "Fade District Atelier",
        ownerId: "MGR-011",
        description:
          "Contemporary barber atelier focused on sharp razor lines, artisanal beard sculpting, and espresso lounge.",
        contact: {
          phone: "+919876543221",
          email: "hello@fadedistrict.com",
        },
        location: {
          type: "Point",
          coordinates: [77.6445, 12.972], // 12th Main, Indiranagar
          address: "88 12th Main, HAL 2nd Stage, Indiranagar, Bengaluru",
        },
        workingHours: {
          monday: "10:00-21:00",
          tuesday: "10:00-21:00",
          wednesday: "10:00-21:00",
          thursday: "10:00-21:00",
          friday: "10:00-22:00",
          saturday: "09:00-22:00",
          sunday: "10:00-20:00",
        },
        images: [
          "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80",
        ],
        rating: 4.8,
        status: "active",
      },
      {
        salonId: "SAL-006",
        salonName: "Barber Republic",
        ownerId: "MGR-012",
        description:
          "Preserving old-world barbershop traditions with Japanese steel blades, organic pomades, and royal shaves.",
        contact: {
          phone: "+919876543222",
          email: "hello@barberrepublic.com",
        },
        location: {
          type: "Point",
          coordinates: [77.639, 12.975], // 100 Feet Rd
          address: "15 Highline Square, 100 Feet Road, Indiranagar, Bengaluru",
        },
        workingHours: {
          monday: "09:00-21:00",
          tuesday: "09:00-21:00",
          wednesday: "09:00-21:00",
          thursday: "09:00-21:00",
          friday: "09:00-21:00",
          saturday: "09:00-22:00",
          sunday: "10:00-20:00",
        },
        images: [
          "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80",
        ],
        rating: 4.9,
        status: "active",
      },
      {
        salonId: "SAL-007",
        salonName: "Toni & Guy Atelier",
        ownerId: "MGR-013",
        description:
          "Couture runway-level hair styling, avant-garde coloring, and luxury scalp rejuvenation.",
        contact: {
          phone: "+919876543223",
          email: "hello@toniguy-atelier.com",
        },
        location: {
          type: "Point",
          coordinates: [77.619, 12.935], // Koramangala 5th Block
          address: "104 5th Block, Koramangala, Bengaluru",
        },
        workingHours: {
          monday: "10:00-21:00",
          tuesday: "10:00-21:00",
          wednesday: "10:00-21:00",
          thursday: "10:00-21:00",
          friday: "10:00-22:00",
          saturday: "10:00-22:00",
          sunday: "11:00-20:00",
        },
        images: [
          "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
        ],
        rating: 4.9,
        status: "active",
      },
    ];

    for (const s of newSalons) {
      await Salon.findOneAndUpdate({ salonId: s.salonId }, s, { upsert: true });
    }
    console.log("✓ Salons upserted");

    // Managers
    const managers = [
      {
        managerId: "MGR-010",
        salonId: "SAL-004",
        name: "Vikram Singhania",
        phone: "+919800000010",
        email: "looks@vexora.com",
        passwordHash,
        role: "owner",
        permissions: [
          "view_analytics",
          "manage_staff",
          "manage_inventory",
          "manage_services",
          "manage_coupons",
          "manage_reviews",
          "manage_appointments",
          "view_payments",
        ],
        status: "active",
      },
    ];

    for (const m of managers) {
      await Manager.findOneAndUpdate({ managerId: m.managerId }, m, { upsert: true });
    }
    console.log("✓ Managers upserted");

    // Services Catalog for Looks & Co. and others
    const standardServices = [
      {
        serviceId: "SRV-HC-01",
        serviceName: "Precision Haircut",
        category: "Haircut",
        description: "Bespoke scissor work, consultation, wash and styled finish.",
        price: 450,
        duration: 30,
        status: "active",
      },
      {
        serviceId: "SRV-BT-01",
        serviceName: "Beard Trim & Sculpting",
        category: "Beard",
        description: "Beard shaping, straight razor edge lineup and hot towel ritual.",
        price: 350,
        duration: 25,
        status: "active",
      },
      {
        serviceId: "SRV-FC-01",
        serviceName: "Executive Facial Therapy",
        category: "Facial",
        description: "Deep pore cleansing, exfoliation, herbal steam and soothing mask.",
        price: 850,
        duration: 45,
        status: "active",
      },
      {
        serviceId: "SRV-CL-01",
        serviceName: "Couture Hair Coloring",
        category: "Hair Color",
        description: "Ammonia-free global color, root touch-up, or custom toner treatment.",
        price: 1400,
        duration: 60,
        status: "active",
      },
      {
        serviceId: "SRV-SP-01",
        serviceName: "Nourishing Hair Spa",
        category: "Hair Spa",
        description: "Intense hydration therapy, essential oils, scalp massage & steam.",
        price: 1100,
        duration: 45,
        status: "active",
      },
      {
        serviceId: "SRV-ST-01",
        serviceName: "Texture & Blowdry Styling",
        category: "Styling",
        description: "Shampoo wash, high-heat blowdry styling and matte clay hold.",
        price: 400,
        duration: 25,
        status: "active",
      },
    ];

    const allSalonIds = ["SAL-001", "SAL-002", "SAL-003", "SAL-004", "SAL-005", "SAL-006", "SAL-007"];
    for (const salonId of allSalonIds) {
      for (const srv of standardServices) {
        await Service.findOneAndUpdate(
          { serviceId: `${srv.serviceId}-${salonId}`, salonId },
          {
            ...srv,
            serviceId: `${srv.serviceId}-${salonId}`,
            salonId,
          },
          { upsert: true }
        );
      }
    }
    console.log("✓ Services upserted");

    // Staff / Stylists for Looks & Co. (SAL-004) and Luxe Aura (SAL-001)
    const stylists = [
      {
        staffId: "STF-LC-01",
        salonId: "SAL-004",
        name: "Rahul Sharma",
        phone: "+919811100001",
        email: "rahul@looksandco.com",
        role: "hair_stylist",
        specialization: ["Precision Haircut", "Beard Trim & Sculpting", "Skin Fades"],
        assignedServices: ["SRV-HC-01-SAL-004", "SRV-BT-01-SAL-004", "SRV-ST-01-SAL-004"],
        status: "active",
      },
      {
        staffId: "STF-LC-02",
        salonId: "SAL-004",
        name: "Vikram Sharma",
        phone: "+919811100002",
        email: "vikram@looksandco.com",
        role: "hair_stylist",
        specialization: ["Precision Haircut", "Hot Towel Shave", "Beard Sculpting"],
        assignedServices: ["SRV-HC-01-SAL-004", "SRV-BT-01-SAL-004"],
        status: "active",
      },
      {
        staffId: "STF-LC-03",
        salonId: "SAL-004",
        name: "Anita Rao",
        phone: "+919811100003",
        email: "anita@looksandco.com",
        role: "beautician",
        specialization: ["Couture Hair Coloring", "Nourishing Hair Spa", "Balayage"],
        assignedServices: ["SRV-CL-01-SAL-004", "SRV-SP-01-SAL-004"],
        status: "active",
      },
      {
        staffId: "STF-LC-04",
        salonId: "SAL-004",
        name: "Sameer Khan",
        phone: "+919811100004",
        email: "sameer@looksandco.com",
        role: "hair_stylist",
        specialization: ["Scissor Cut", "Executive Facial Therapy"],
        assignedServices: ["SRV-HC-01-SAL-004", "SRV-FC-01-SAL-004"],
        status: "active",
      },
      {
        staffId: "STF-LC-05",
        salonId: "SAL-004",
        name: "Kunal Patel",
        phone: "+919811100005",
        email: "kunal@looksandco.com",
        role: "barber",
        specialization: ["Beard Trim", "Basic Cut"],
        assignedServices: ["SRV-BT-01-SAL-004", "SRV-HC-01-SAL-004"],
        status: "active",
      },
    ];

    for (const st of stylists) {
      await Staff.findOneAndUpdate({ staffId: st.staffId }, st, { upsert: true });
    }
    console.log("✓ Stylists upserted");

    // Active Queue Appointments for Looks & Co. (SAL-004)
    const today = new Date();
    const demoQueue = [
      {
        appointmentId: "APT-VXR-098-1001",
        customerId: "CUST-001",
        salonId: "SAL-004",
        serviceId: "SRV-HC-01-SAL-004",
        staffId: "STF-LC-02", // Vikram
        appointmentDate: today,
        startTime: "14:15",
        endTime: "14:45",
        bookingType: "queue",
        queuePosition: 1,
        estimatedWaitTime: 8,
        price: 450,
        status: "in_service",
        checkIn: { status: "checked_in", checkedInAt: new Date(Date.now() - 15 * 60000) },
      },
      {
        appointmentId: "APT-VXR-099-1002",
        customerId: "CUST-002",
        salonId: "SAL-004",
        serviceId: "SRV-BT-01-SAL-004",
        staffId: "STF-LC-01", // Rahul
        appointmentDate: today,
        startTime: "14:30",
        endTime: "14:55",
        bookingType: "queue",
        queuePosition: 2,
        estimatedWaitTime: 18,
        price: 350,
        status: "waiting",
      },
      {
        appointmentId: "APT-VXR-100-1003",
        customerId: "CUST-003",
        salonId: "SAL-004",
        serviceId: "SRV-SP-01-SAL-004",
        staffId: "STF-LC-03", // Anita
        appointmentDate: today,
        startTime: "14:45",
        endTime: "15:30",
        bookingType: "queue",
        queuePosition: 3,
        estimatedWaitTime: 36,
        price: 1100,
        status: "waiting",
      },
    ];

    for (const q of demoQueue) {
      await Appointment.findOneAndUpdate({ appointmentId: q.appointmentId }, q, { upsert: true });
    }
    console.log("✓ Active queue seeded for Looks & Co.");

    console.log("Supplemental seeding finished successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Supplemental seed error:", err);
    process.exit(1);
  }
};

seedExpandedSalons();
