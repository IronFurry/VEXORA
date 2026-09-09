const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const Salon = require("../models/Salon");
const Service = require("../models/Service");
const Customer = require("../models/Customer");
const Staff = require("../models/Staff");
const Manager = require("../models/Manager");
const StaffAttendance = require("../models/StaffAttendance");
const Appointment = require("../models/Appointment");
const Payment = require("../models/Payment");
const Review = require("../models/Review");
const Coupon = require("../models/Coupon");
const Inventory = require("../models/Inventory");

const connectDB = require("../config/db");

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log("Connected to MongoDB");

    // --------------------------------------------------
    // RESET DATABASE
    // --------------------------------------------------

    if (process.argv.includes("--reset")) {
      console.log("Resetting VEXORA database...");

      await Promise.all([
        Salon.deleteMany({}),
        Service.deleteMany({}),
        Customer.deleteMany({}),
        Staff.deleteMany({}),
        Manager.deleteMany({}),
        StaffAttendance.deleteMany({}),
        Appointment.deleteMany({}),
        Payment.deleteMany({}),
        Review.deleteMany({}),
        Coupon.deleteMany({}),
        Inventory.deleteMany({})
      ]);

      console.log("Database reset completed");
    }

    // --------------------------------------------------
    // PASSWORD
    // --------------------------------------------------

    const passwordHash = await bcrypt.hash("Vexora@123", 10);

    // --------------------------------------------------
    // SALONS
    // --------------------------------------------------

    const salons = [
      {
        salonId: "SAL-001",
        salonName: "Luxe Aura Salon",
        ownerId: "MGR-001",
        description:
          "Premium unisex salon offering hair, beauty, grooming and makeup services.",
        contact: {
          phone: "+919876543210",
          email: "hello@luxeaura.com"
        },
        location: {
          type: "Point",
          coordinates: [77.5946, 12.9716],
          address: "MG Road, Bengaluru, Karnataka"
        },
        workingHours: {
          monday: "09:00-21:00",
          tuesday: "09:00-21:00",
          wednesday: "09:00-21:00",
          thursday: "09:00-21:00",
          friday: "09:00-21:00",
          saturday: "09:00-22:00",
          sunday: "10:00-20:00"
        },
        images: [
          "https://images.unsplash.com/photo-1560066984-138dadb4c035",
          "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f"
        ],
        rating: 4.7,
        status: "active"
      },

      {
        salonId: "SAL-002",
        salonName: "Urban Glow Studio",
        ownerId: "MGR-004",
        description:
          "Modern beauty studio specializing in styling, skincare and bridal makeup.",
        contact: {
          phone: "+919876543211",
          email: "hello@urbanglow.com"
        },
        location: {
          type: "Point",
          coordinates: [77.6412, 12.9784],
          address: "Indiranagar, Bengaluru, Karnataka"
        },
        workingHours: {
          monday: "10:00-20:00",
          tuesday: "10:00-20:00",
          wednesday: "10:00-20:00",
          thursday: "10:00-20:00",
          friday: "10:00-21:00",
          saturday: "09:00-21:00",
          sunday: "10:00-19:00"
        },
        images: [
          "https://images.unsplash.com/photo-1562322140-8baeececf3df"
        ],
        rating: 4.5,
        status: "active"
      },

      {
        salonId: "SAL-003",
        salonName: "The Gentlemen's Club",
        ownerId: "MGR-007",
        description:
          "Premium men's grooming lounge offering haircuts, beard styling and spa services.",
        contact: {
          phone: "+919876543212",
          email: "hello@gentlemensclub.com"
        },
        location: {
          type: "Point",
          coordinates: [77.6101, 12.9352],
          address: "Koramangala, Bengaluru, Karnataka"
        },
        workingHours: {
          monday: "09:00-21:00",
          tuesday: "09:00-21:00",
          wednesday: "09:00-21:00",
          thursday: "09:00-21:00",
          friday: "09:00-22:00",
          saturday: "09:00-22:00",
          sunday: "10:00-20:00"
        },
        images: [
          "https://images.unsplash.com/photo-1503951914875-452162b0f3f1"
        ],
        rating: 4.8,
        status: "active"
      }
    ];

    await Salon.insertMany(salons);

    console.log("✓ Salons seeded");

    // --------------------------------------------------
    // MANAGERS / OWNERS
    // --------------------------------------------------

    const managers = [
      {
        managerId: "MGR-001",
        salonId: "SAL-001",
        name: "Arjun Mehta",
        phone: "+919800000001",
        email: "arjun@luxeaura.com",
        passwordHash,
        role: "owner",
        reportsTo: null,
        permissions: [
          "view_analytics",
          "manage_staff",
          "manage_inventory",
          "manage_services",
          "manage_coupons",
          "manage_reviews",
          "manage_appointments",
          "view_payments"
        ],
        status: "active"
      },

      {
        managerId: "MGR-002",
        salonId: "SAL-001",
        name: "Priya Sharma",
        phone: "+919800000002",
        email: "priya@luxeaura.com",
        passwordHash,
        role: "manager",
        reportsTo: "MGR-001",
        permissions: [
          "view_analytics",
          "manage_staff",
          "manage_inventory",
          "manage_services",
          "manage_coupons",
          "manage_reviews",
          "manage_appointments"
        ],
        status: "active"
      },

      {
        managerId: "MGR-003",
        salonId: "SAL-001",
        name: "Rohan Kapoor",
        phone: "+919800000003",
        email: "rohan@luxeaura.com",
        passwordHash,
        role: "manager",
        reportsTo: "MGR-001",
        permissions: [
          "manage_staff",
          "manage_appointments",
          "manage_reviews"
        ],
        status: "active"
      },

      {
        managerId: "MGR-004",
        salonId: "SAL-002",
        name: "Neha Verma",
        phone: "+919800000004",
        email: "neha@urbanglow.com",
        passwordHash,
        role: "owner",
        reportsTo: null,
        permissions: [
          "view_analytics",
          "manage_staff",
          "manage_inventory",
          "manage_services",
          "manage_coupons",
          "manage_reviews",
          "manage_appointments",
          "view_payments"
        ],
        status: "active"
      },

      {
        managerId: "MGR-005",
        salonId: "SAL-002",
        name: "Karan Singh",
        phone: "+919800000005",
        email: "karan@urbanglow.com",
        passwordHash,
        role: "manager",
        reportsTo: "MGR-004",
        permissions: [
          "view_analytics",
          "manage_staff",
          "manage_appointments",
          "manage_reviews"
        ],
        status: "active"
      },

      {
        managerId: "MGR-006",
        salonId: "SAL-002",
        name: "Ananya Rao",
        phone: "+919800000006",
        email: "ananya@urbanglow.com",
        passwordHash,
        role: "manager",
        reportsTo: "MGR-004",
        permissions: [
          "manage_appointments",
          "manage_reviews"
        ],
        status: "active"
      },

      {
        managerId: "MGR-007",
        salonId: "SAL-003",
        name: "Vikram Malhotra",
        phone: "+919800000007",
        email: "vikram@gentlemensclub.com",
        passwordHash,
        role: "owner",
        reportsTo: null,
        permissions: [
          "view_analytics",
          "manage_staff",
          "manage_inventory",
          "manage_services",
          "manage_coupons",
          "manage_reviews",
          "manage_appointments",
          "view_payments"
        ],
        status: "active"
      },

      {
        managerId: "MGR-008",
        salonId: "SAL-003",
        name: "Aditya Nair",
        phone: "+919800000008",
        email: "aditya@gentlemensclub.com",
        passwordHash,
        role: "manager",
        reportsTo: "MGR-007",
        permissions: [
          "view_analytics",
          "manage_staff",
          "manage_appointments",
          "manage_reviews"
        ],
        status: "active"
      }
    ];

    await Manager.insertMany(managers);

    console.log("✓ Managers seeded");

    // --------------------------------------------------
    // STAFF
    // --------------------------------------------------

    const staff = [
      {
        staffId: "STF-001",
        salonId: "SAL-001",
        name: "Rahul Desai",
        phone: "+919810000001",
        email: "rahul@luxeaura.com",
        role: "hair_stylist",
        specialization: ["Haircut", "Hair Color", "Styling"],
        reportsTo: "MGR-002",
        assignedServices: ["SRV-001", "SRV-002", "SRV-003"],
        schedule: {
          monday: "09:00-18:00",
          tuesday: "09:00-18:00",
          wednesday: "09:00-18:00",
          thursday: "09:00-18:00",
          friday: "09:00-18:00",
          saturday: "10:00-19:00",
          sunday: "OFF"
        },
        joiningDate: new Date("2024-01-15"),
        employmentType: "full_time",
        status: "active"
      },

      {
        staffId: "STF-002",
        salonId: "SAL-001",
        name: "Meera Joshi",
        phone: "+919810000002",
        email: "meera@luxeaura.com",
        role: "beautician",
        specialization: ["Facial", "Cleanup", "Skin Care"],
        reportsTo: "MGR-002",
        assignedServices: ["SRV-004", "SRV-005"],
        schedule: {
          monday: "10:00-19:00",
          tuesday: "10:00-19:00",
          wednesday: "10:00-19:00",
          thursday: "10:00-19:00",
          friday: "10:00-19:00",
          saturday: "10:00-19:00",
          sunday: "OFF"
        },
        joiningDate: new Date("2024-03-10"),
        employmentType: "full_time",
        status: "active"
      },

      {
        staffId: "STF-003",
        salonId: "SAL-001",
        name: "Sana Khan",
        phone: "+919810000003",
        email: "sana@luxeaura.com",
        role: "makeup_artist",
        specialization: ["Bridal Makeup", "Party Makeup"],
        reportsTo: "MGR-003",
        assignedServices: ["SRV-006"],
        schedule: {
          monday: "11:00-20:00",
          tuesday: "11:00-20:00",
          wednesday: "OFF",
          thursday: "11:00-20:00",
          friday: "11:00-20:00",
          saturday: "10:00-20:00",
          sunday: "10:00-18:00"
        },
        joiningDate: new Date("2023-08-20"),
        employmentType: "full_time",
        status: "active"
      },

      {
        staffId: "STF-004",
        salonId: "SAL-001",
        name: "Vijay Kumar",
        phone: "+919810000004",
        email: "vijay@luxeaura.com",
        role: "barber",
        specialization: ["Beard Styling", "Men's Haircut"],
        reportsTo: "MGR-003",
        assignedServices: ["SRV-007", "SRV-008"],
        schedule: {
          monday: "09:00-18:00",
          tuesday: "OFF",
          wednesday: "09:00-18:00",
          thursday: "09:00-18:00",
          friday: "09:00-18:00",
          saturday: "09:00-19:00",
          sunday: "10:00-18:00"
        },
        joiningDate: new Date("2024-06-01"),
        employmentType: "full_time",
        status: "active"
      },

      {
        staffId: "STF-005",
        salonId: "SAL-001",
        name: "Aisha Thomas",
        phone: "+919810000005",
        email: "aisha@luxeaura.com",
        role: "receptionist",
        specialization: ["Front Desk", "Customer Service"],
        reportsTo: "MGR-002",
        assignedServices: [],
        schedule: {
          monday: "09:00-18:00",
          tuesday: "09:00-18:00",
          wednesday: "09:00-18:00",
          thursday: "09:00-18:00",
          friday: "09:00-18:00",
          saturday: "10:00-19:00",
          sunday: "OFF"
        },
        joiningDate: new Date("2024-02-01"),
        employmentType: "full_time",
        status: "active"
      },

      {
        staffId: "STF-006",
        salonId: "SAL-002",
        name: "Riya Kapoor",
        phone: "+919820000001",
        email: "riya@urbanglow.com",
        role: "hair_stylist",
        specialization: ["Hair Styling", "Hair Color"],
        reportsTo: "MGR-005",
        assignedServices: ["SRV-009", "SRV-010"],
        schedule: {
          monday: "10:00-19:00",
          tuesday: "10:00-19:00",
          wednesday: "10:00-19:00",
          thursday: "10:00-19:00",
          friday: "10:00-19:00",
          saturday: "09:00-19:00",
          sunday: "OFF"
        },
        joiningDate: new Date("2023-11-10"),
        employmentType: "full_time",
        status: "active"
      },

      {
        staffId: "STF-007",
        salonId: "SAL-002",
        name: "Pooja Iyer",
        phone: "+919820000002",
        email: "pooja@urbanglow.com",
        role: "beautician",
        specialization: ["Facial", "Manicure", "Pedicure"],
        reportsTo: "MGR-005",
        assignedServices: ["SRV-011", "SRV-012"],
        schedule: {
          monday: "10:00-19:00",
          tuesday: "10:00-19:00",
          wednesday: "OFF",
          thursday: "10:00-19:00",
          friday: "10:00-19:00",
          saturday: "10:00-20:00",
          sunday: "10:00-18:00"
        },
        joiningDate: new Date("2024-01-20"),
        employmentType: "full_time",
        status: "active"
      },

      {
        staffId: "STF-008",
        salonId: "SAL-002",
        name: "Ishita Menon",
        phone: "+919820000003",
        email: "ishita@urbanglow.com",
        role: "makeup_artist",
        specialization: ["Bridal Makeup", "Airbrush Makeup"],
        reportsTo: "MGR-006",
        assignedServices: ["SRV-013"],
        schedule: {
          monday: "11:00-20:00",
          tuesday: "11:00-20:00",
          wednesday: "11:00-20:00",
          thursday: "OFF",
          friday: "11:00-20:00",
          saturday: "10:00-20:00",
          sunday: "10:00-18:00"
        },
        joiningDate: new Date("2024-05-15"),
        employmentType: "full_time",
        status: "active"
      },

      {
        staffId: "STF-009",
        salonId: "SAL-002",
        name: "Nikhil Rao",
        phone: "+919820000004",
        email: "nikhil@urbanglow.com",
        role: "receptionist",
        specialization: ["Front Desk"],
        reportsTo: "MGR-006",
        assignedServices: [],
        schedule: {
          monday: "10:00-19:00",
          tuesday: "10:00-19:00",
          wednesday: "10:00-19:00",
          thursday: "10:00-19:00",
          friday: "10:00-19:00",
          saturday: "09:00-18:00",
          sunday: "OFF"
        },
        joiningDate: new Date("2024-04-01"),
        employmentType: "full_time",
        status: "active"
      },

      {
        staffId: "STF-010",
        salonId: "SAL-003",
        name: "Aravind Menon",
        phone: "+919830000001",
        email: "aravind@gentlemensclub.com",
        role: "barber",
        specialization: ["Classic Haircut", "Fade", "Beard"],
        reportsTo: "MGR-008",
        assignedServices: ["SRV-014", "SRV-015", "SRV-016"],
        schedule: {
          monday: "09:00-18:00",
          tuesday: "09:00-18:00",
          wednesday: "09:00-18:00",
          thursday: "OFF",
          friday: "09:00-18:00",
          saturday: "09:00-19:00",
          sunday: "10:00-18:00"
        },
        joiningDate: new Date("2023-09-01"),
        employmentType: "full_time",
        status: "active"
      },

      {
        staffId: "STF-011",
        salonId: "SAL-003",
        name: "Sameer Khan",
        phone: "+919830000002",
        email: "sameer@gentlemensclub.com",
        role: "barber",
        specialization: ["Beard", "Haircut", "Head Massage"],
        reportsTo: "MGR-008",
        assignedServices: ["SRV-014", "SRV-016", "SRV-017"],
        schedule: {
          monday: "10:00-19:00",
          tuesday: "10:00-19:00",
          wednesday: "10:00-19:00",
          thursday: "10:00-19:00",
          friday: "10:00-19:00",
          saturday: "09:00-19:00",
          sunday: "OFF"
        },
        joiningDate: new Date("2024-02-10"),
        employmentType: "full_time",
        status: "active"
      },

      {
        staffId: "STF-012",
        salonId: "SAL-003",
        name: "Dev Patel",
        phone: "+919830000003",
        email: "dev@gentlemensclub.com",
        role: "barber",
        specialization: ["Fade", "Beard Styling"],
        reportsTo: "MGR-008",
        assignedServices: ["SRV-015", "SRV-016"],
        schedule: {
          monday: "09:00-18:00",
          tuesday: "OFF",
          wednesday: "09:00-18:00",
          thursday: "09:00-18:00",
          friday: "09:00-18:00",
          saturday: "09:00-19:00",
          sunday: "10:00-18:00"
        },
        joiningDate: new Date("2024-07-01"),
        employmentType: "full_time",
        status: "active"
      },

      {
        staffId: "STF-013",
        salonId: "SAL-003",
        name: "Kunal Shah",
        phone: "+919830000004",
        email: "kunal@gentlemensclub.com",
        role: "receptionist",
        specialization: ["Front Desk", "Bookings"],
        reportsTo: "MGR-008",
        assignedServices: [],
        schedule: {
          monday: "09:00-18:00",
          tuesday: "09:00-18:00",
          wednesday: "09:00-18:00",
          thursday: "09:00-18:00",
          friday: "09:00-18:00",
          saturday: "09:00-19:00",
          sunday: "OFF"
        },
        joiningDate: new Date("2024-03-01"),
        employmentType: "full_time",
        status: "active"
      }
    ];

    await Staff.insertMany(staff);

    console.log("✓ Staff seeded");

    // --------------------------------------------------
    // SERVICES
    // --------------------------------------------------

    const services = [
      {
        serviceId: "SRV-001",
        salonId: "SAL-001",
        serviceName: "Classic Haircut",
        category: "Hair",
        description: "Professional haircut and styling.",
        price: 500,
        duration: 45,
        assignedStaff: ["STF-001"],
        status: "active"
      },

      {
        serviceId: "SRV-002",
        salonId: "SAL-001",
        serviceName: "Hair Coloring",
        category: "Hair",
        description: "Premium hair coloring service.",
        price: 1800,
        duration: 120,
        assignedStaff: ["STF-001"],
        status: "active"
      },

      {
        serviceId: "SRV-003",
        salonId: "SAL-001",
        serviceName: "Hair Spa",
        category: "Hair",
        description: "Relaxing deep-conditioning hair spa.",
        price: 1200,
        duration: 75,
        assignedStaff: ["STF-001"],
        status: "active"
      },

      {
        serviceId: "SRV-004",
        salonId: "SAL-001",
        serviceName: "Gold Facial",
        category: "Skin",
        description: "Luxury facial treatment.",
        price: 1500,
        duration: 60,
        assignedStaff: ["STF-002"],
        status: "active"
      },

      {
        serviceId: "SRV-005",
        salonId: "SAL-001",
        serviceName: "Cleanup",
        category: "Skin",
        description: "Refreshing skin cleanup.",
        price: 700,
        duration: 45,
        assignedStaff: ["STF-002"],
        status: "active"
      },

      {
        serviceId: "SRV-006",
        salonId: "SAL-001",
        serviceName: "Party Makeup",
        category: "Makeup",
        description: "Professional party makeup.",
        price: 2500,
        duration: 90,
        assignedStaff: ["STF-003"],
        status: "active"
      },

      {
        serviceId: "SRV-007",
        salonId: "SAL-001",
        serviceName: "Beard Styling",
        category: "Grooming",
        description: "Premium beard shaping and styling.",
        price: 350,
        duration: 30,
        assignedStaff: ["STF-004"],
        status: "active"
      },

      {
        serviceId: "SRV-008",
        salonId: "SAL-001",
        serviceName: "Men's Grooming Combo",
        category: "Grooming",
        description: "Haircut and beard styling combo.",
        price: 800,
        duration: 60,
        assignedStaff: ["STF-004"],
        status: "active"
      },

      {
        serviceId: "SRV-009",
        salonId: "SAL-002",
        serviceName: "Premium Haircut",
        category: "Hair",
        description: "Modern haircut with styling.",
        price: 650,
        duration: 50,
        assignedStaff: ["STF-006"],
        status: "active"
      },

      {
        serviceId: "SRV-010",
        salonId: "SAL-002",
        serviceName: "Hair Highlights",
        category: "Hair",
        description: "Professional hair highlights.",
        price: 2200,
        duration: 150,
        assignedStaff: ["STF-006"],
        status: "active"
      },

      {
        serviceId: "SRV-011",
        salonId: "SAL-002",
        serviceName: "Luxury Facial",
        category: "Skin",
        description: "Deep cleansing luxury facial.",
        price: 1800,
        duration: 75,
        assignedStaff: ["STF-007"],
        status: "active"
      },

      {
        serviceId: "SRV-012",
        salonId: "SAL-002",
        serviceName: "Manicure & Pedicure",
        category: "Nails",
        description: "Complete manicure and pedicure.",
        price: 1200,
        duration: 90,
        assignedStaff: ["STF-007"],
        status: "active"
      },

      {
        serviceId: "SRV-013",
        salonId: "SAL-002",
        serviceName: "Bridal Makeup",
        category: "Makeup",
        description: "Complete bridal makeup package.",
        price: 8500,
        duration: 180,
        assignedStaff: ["STF-008"],
        status: "active"
      },

      {
        serviceId: "SRV-014",
        salonId: "SAL-003",
        serviceName: "Classic Men's Haircut",
        category: "Hair",
        description: "Classic men's haircut.",
        price: 450,
        duration: 40,
        assignedStaff: ["STF-010", "STF-011"],
        status: "active"
      },

      {
        serviceId: "SRV-015",
        salonId: "SAL-003",
        serviceName: "Skin Fade",
        category: "Hair",
        description: "Professional skin fade haircut.",
        price: 600,
        duration: 50,
        assignedStaff: ["STF-010", "STF-012"],
        status: "active"
      },

      {
        serviceId: "SRV-016",
        salonId: "SAL-003",
        serviceName: "Beard Styling",
        category: "Beard",
        description: "Precision beard trimming and styling.",
        price: 300,
        duration: 30,
        assignedStaff: ["STF-010", "STF-011", "STF-012"],
        status: "active"
      },

      {
        serviceId: "SRV-017",
        salonId: "SAL-003",
        serviceName: "Head Massage",
        category: "Spa",
        description: "Relaxing head massage.",
        price: 500,
        duration: 40,
        assignedStaff: ["STF-011"],
        status: "active"
      }
    ];

    await Service.insertMany(services);

    console.log("✓ Services seeded");

    // --------------------------------------------------
    // CUSTOMERS
    // --------------------------------------------------

    const customers = [
      {
        customerId: "CUS-001",
        name: "Aarav Sharma",
        phone: "+919900000001",
        email: "aarav@gmail.com",
        gender: "male",
        dateOfBirth: new Date("1998-04-12"),
        preferredLanguage: "en",
        wishlistSalons: ["SAL-001", "SAL-003"],
        favoriteStaff: ["STF-001", "STF-010"]
      },

      {
        customerId: "CUS-002",
        name: "Ananya Gupta",
        phone: "+919900000002",
        email: "ananya@gmail.com",
        gender: "female",
        dateOfBirth: new Date("1999-08-22"),
        preferredLanguage: "en",
        wishlistSalons: ["SAL-001", "SAL-002"],
        favoriteStaff: ["STF-002", "STF-008"]
      },

      {
        customerId: "CUS-003",
        name: "Rohan Verma",
        phone: "+919900000003",
        email: "rohan@gmail.com",
        gender: "male",
        dateOfBirth: new Date("1995-02-18"),
        preferredLanguage: "hi",
        wishlistSalons: ["SAL-003"],
        favoriteStaff: ["STF-011"]
      },

      {
        customerId: "CUS-004",
        name: "Diya Nair",
        phone: "+919900000004",
        email: "diya@gmail.com",
        gender: "female",
        dateOfBirth: new Date("2000-11-05"),
        preferredLanguage: "en",
        wishlistSalons: ["SAL-001", "SAL-002"],
        favoriteStaff: ["STF-003", "STF-008"]
      },

      {
        customerId: "CUS-005",
        name: "Kabir Malhotra",
        phone: "+919900000005",
        email: "kabir@gmail.com",
        gender: "male",
        dateOfBirth: new Date("1997-06-14"),
        preferredLanguage: "en",
        wishlistSalons: ["SAL-003"],
        favoriteStaff: ["STF-010"]
      },

      {
        customerId: "CUS-006",
        name: "Meera Patel",
        phone: "+919900000006",
        email: "meera@gmail.com",
        gender: "female",
        dateOfBirth: new Date("1996-03-09"),
        preferredLanguage: "gu",
        wishlistSalons: ["SAL-001"],
        favoriteStaff: ["STF-002"]
      },

      {
        customerId: "CUS-007",
        name: "Aditya Rao",
        phone: "+919900000007",
        email: "aditya@gmail.com",
        gender: "male",
        dateOfBirth: new Date("1994-12-21"),
        preferredLanguage: "en",
        wishlistSalons: ["SAL-003"],
        favoriteStaff: ["STF-012"]
      },

      {
        customerId: "CUS-008",
        name: "Isha Kapoor",
        phone: "+919900000008",
        email: "isha@gmail.com",
        gender: "female",
        dateOfBirth: new Date("2001-01-17"),
        preferredLanguage: "en",
        wishlistSalons: ["SAL-002"],
        favoriteStaff: ["STF-006", "STF-007"]
      },

      {
        customerId: "CUS-009",
        name: "Vivek Joshi",
        phone: "+919900000009",
        email: "vivek@gmail.com",
        gender: "male",
        dateOfBirth: new Date("1992-09-30"),
        preferredLanguage: "hi",
        wishlistSalons: ["SAL-001", "SAL-003"],
        favoriteStaff: ["STF-004"]
      },

      {
        customerId: "CUS-010",
        name: "Sara Thomas",
        phone: "+919900000010",
        email: "sara@gmail.com",
        gender: "female",
        dateOfBirth: new Date("1998-07-26"),
        preferredLanguage: "en",
        wishlistSalons: ["SAL-001", "SAL-002"],
        favoriteStaff: ["STF-003", "STF-008"]
      },

      {
        customerId: "CUS-011",
        name: "Karthik Menon",
        phone: "+919900000011",
        email: "karthik@gmail.com",
        gender: "male",
        dateOfBirth: new Date("1991-05-11"),
        preferredLanguage: "ml",
        wishlistSalons: ["SAL-003"],
        favoriteStaff: ["STF-011"]
      },

      {
        customerId: "CUS-012",
        name: "Nisha Shah",
        phone: "+919900000012",
        email: "nisha@gmail.com",
        gender: "female",
        dateOfBirth: new Date("1999-10-02"),
        preferredLanguage: "gu",
        wishlistSalons: ["SAL-002"],
        favoriteStaff: ["STF-007"]
      }
    ];

    await Customer.insertMany(customers);

    console.log("✓ Customers seeded");

    // --------------------------------------------------
    // COUPONS
    // --------------------------------------------------

    const now = new Date();

    const coupons = [
      {
        couponId: "CPN-001",
        salonId: "SAL-001",
        code: "WELCOME20",
        discountType: "percentage",
        discountValue: 20,
        minimumAmount: 500,
        maximumDiscount: 500,
        validFrom: new Date("2026-01-01"),
        validUntil: new Date("2026-12-31"),
        usageLimit: 500,
        usedCount: 127,
        status: "active"
      },

      {
        couponId: "CPN-002",
        salonId: "SAL-001",
        code: "LUXE300",
        discountType: "fixed",
        discountValue: 300,
        minimumAmount: 1500,
        maximumDiscount: null,
        validFrom: new Date("2026-06-01"),
        validUntil: new Date("2026-10-31"),
        usageLimit: 200,
        usedCount: 63,
        status: "active"
      },

      {
        couponId: "CPN-003",
        salonId: "SAL-002",
        code: "GLOW15",
        discountType: "percentage",
        discountValue: 15,
        minimumAmount: 1000,
        maximumDiscount: 750,
        validFrom: new Date("2026-01-01"),
        validUntil: new Date("2026-12-31"),
        usageLimit: 300,
        usedCount: 89,
        status: "active"
      },

      {
        couponId: "CPN-004",
        salonId: "SAL-003",
        code: "MEN100",
        discountType: "fixed",
        discountValue: 100,
        minimumAmount: 500,
        maximumDiscount: null,
        validFrom: new Date("2026-07-01"),
        validUntil: new Date("2026-11-30"),
        usageLimit: 250,
        usedCount: 72,
        status: "active"
      },

      {
        couponId: "CPN-005",
        salonId: "SAL-002",
        code: "OLDGLOW",
        discountType: "percentage",
        discountValue: 10,
        minimumAmount: 500,
        maximumDiscount: 300,
        validFrom: new Date("2025-01-01"),
        validUntil: new Date("2025-12-31"),
        usageLimit: 100,
        usedCount: 100,
        status: "expired"
      }
    ];

    await Coupon.insertMany(coupons);

    console.log("✓ Coupons seeded");

    // --------------------------------------------------
    // INVENTORY
    // --------------------------------------------------

    const inventory = [
      {
        inventoryId: "INV-001",
        salonId: "SAL-001",
        productName: "L'Oreal Shampoo",
        category: "Hair Care",
        quantity: 18,
        unit: "bottles",
        lowStockThreshold: 5,
        purchasePrice: 450,
        supplier: "L'Oreal Professional",
        status: "in_stock"
      },

      {
        inventoryId: "INV-002",
        salonId: "SAL-001",
        productName: "Hair Color Cream",
        category: "Hair Color",
        quantity: 4,
        unit: "boxes",
        lowStockThreshold: 5,
        purchasePrice: 700,
        supplier: "Schwarzkopf",
        status: "low_stock"
      },

      {
        inventoryId: "INV-003",
        salonId: "SAL-001",
        productName: "Facial Kit",
        category: "Skin Care",
        quantity: 12,
        unit: "kits",
        lowStockThreshold: 4,
        purchasePrice: 850,
        supplier: "O3+",
        status: "in_stock"
      },

      {
        inventoryId: "INV-004",
        salonId: "SAL-001",
        productName: "Disposable Towels",
        category: "Consumables",
        quantity: 70,
        unit: "packs",
        lowStockThreshold: 10,
        purchasePrice: 120,
        supplier: "Salon Supplies India",
        status: "in_stock"
      },

      {
        inventoryId: "INV-005",
        salonId: "SAL-002",
        productName: "Professional Hair Shampoo",
        category: "Hair Care",
        quantity: 20,
        unit: "bottles",
        lowStockThreshold: 5,
        purchasePrice: 500,
        supplier: "Matrix",
        status: "in_stock"
      },

      {
        inventoryId: "INV-006",
        salonId: "SAL-002",
        productName: "Hair Serum",
        category: "Hair Care",
        quantity: 3,
        unit: "bottles",
        lowStockThreshold: 5,
        purchasePrice: 650,
        supplier: "Wella",
        status: "low_stock"
      },

      {
        inventoryId: "INV-007",
        salonId: "SAL-002",
        productName: "Manicure Kit",
        category: "Nails",
        quantity: 15,
        unit: "kits",
        lowStockThreshold: 5,
        purchasePrice: 350,
        supplier: "NailPro",
        status: "in_stock"
      },

      {
        inventoryId: "INV-008",
        salonId: "SAL-002",
        productName: "Makeup Foundation",
        category: "Makeup",
        quantity: 2,
        unit: "bottles",
        lowStockThreshold: 4,
        purchasePrice: 1200,
        supplier: "MAC",
        status: "low_stock"
      },

      {
        inventoryId: "INV-009",
        salonId: "SAL-003",
        productName: "Beard Oil",
        category: "Beard Care",
        quantity: 25,
        unit: "bottles",
        lowStockThreshold: 5,
        purchasePrice: 300,
        supplier: "Beardo",
        status: "in_stock"
      },

      {
        inventoryId: "INV-010",
        salonId: "SAL-003",
        productName: "Shaving Cream",
        category: "Grooming",
        quantity: 8,
        unit: "tubes",
        lowStockThreshold: 5,
        purchasePrice: 220,
        supplier: "Bombay Shaving Company",
        status: "in_stock"
      },

      {
        inventoryId: "INV-011",
        salonId: "SAL-003",
        productName: "Hair Styling Wax",
        category: "Hair Care",
        quantity: 3,
        unit: "jars",
        lowStockThreshold: 5,
        purchasePrice: 280,
        supplier: "Ustraa",
        status: "low_stock"
      },

      {
        inventoryId: "INV-012",
        salonId: "SAL-003",
        productName: "Disposable Razors",
        category: "Consumables",
        quantity: 0,
        unit: "packs",
        lowStockThreshold: 5,
        purchasePrice: 180,
        supplier: "Salon Supplies India",
        status: "out_of_stock"
      }
    ];

    await Inventory.insertMany(inventory);

    console.log("✓ Inventory seeded");

    // --------------------------------------------------
    // APPOINTMENTS
    // --------------------------------------------------

    const appointments = [
      {
        appointmentId: "APT-001",
        customerId: "CUS-001",
        salonId: "SAL-001",
        serviceId: "SRV-001",
        staffId: "STF-001",
        appointmentDate: new Date("2026-08-25"),
        startTime: "10:00",
        endTime: "10:45",
        bookingType: "appointment",
        queuePosition: null,
        estimatedWaitTime: 0,
        price: 500,
        couponId: null,
        paymentId: "PAY-001",
        checkIn: {
          status: "checked_in",
          checkedInAt: new Date("2026-08-25T09:55:00"),
          checkedInBy: "STF-005"
        },
        status: "completed"
      },

      {
        appointmentId: "APT-002",
        customerId: "CUS-002",
        salonId: "SAL-001",
        serviceId: "SRV-004",
        staffId: "STF-002",
        appointmentDate: new Date("2026-08-26"),
        startTime: "11:00",
        endTime: "12:00",
        bookingType: "appointment",
        queuePosition: null,
        estimatedWaitTime: 0,
        price: 1500,
        couponId: "CPN-001",
        paymentId: "PAY-002",
        checkIn: {
          status: "checked_in",
          checkedInAt: new Date("2026-08-26T10:55:00"),
          checkedInBy: "STF-005"
        },
        status: "completed"
      },

      {
        appointmentId: "APT-003",
        customerId: "CUS-003",
        salonId: "SAL-003",
        serviceId: "SRV-014",
        staffId: "STF-010",
        appointmentDate: new Date("2026-08-27"),
        startTime: "14:00",
        endTime: "14:40",
        bookingType: "appointment",
        queuePosition: null,
        estimatedWaitTime: 0,
        price: 450,
        couponId: null,
        paymentId: "PAY-003",
        checkIn: {
          status: "checked_in",
          checkedInAt: new Date("2026-08-27T13:55:00"),
          checkedInBy: "STF-013"
        },
        status: "completed"
      },

      {
        appointmentId: "APT-004",
        customerId: "CUS-004",
        salonId: "SAL-002",
        serviceId: "SRV-013",
        staffId: "STF-008",
        appointmentDate: new Date("2026-08-28"),
        startTime: "15:00",
        endTime: "18:00",
        bookingType: "appointment",
        queuePosition: null,
        estimatedWaitTime: 0,
        price: 8500,
        couponId: "CPN-003",
        paymentId: "PAY-004",
        checkIn: {
          status: "checked_in",
          checkedInAt: new Date("2026-08-28T14:50:00"),
          checkedInBy: "STF-009"
        },
        status: "completed"
      },

      {
        appointmentId: "APT-005",
        customerId: "CUS-005",
        salonId: "SAL-003",
        serviceId: "SRV-015",
        staffId: "STF-012",
        appointmentDate: new Date("2026-08-29"),
        startTime: "16:00",
        endTime: "16:50",
        bookingType: "appointment",
        queuePosition: null,
        estimatedWaitTime: 0,
        price: 600,
        couponId: "CPN-004",
        paymentId: "PAY-005",
        checkIn: {
          status: "checked_in",
          checkedInAt: new Date("2026-08-29T15:55:00"),
          checkedInBy: "STF-013"
        },
        status: "completed"
      },

      {
        appointmentId: "APT-006",
        customerId: "CUS-006",
        salonId: "SAL-001",
        serviceId: "SRV-003",
        staffId: "STF-001",
        appointmentDate: new Date("2026-08-30"),
        startTime: "12:00",
        endTime: "13:15",
        bookingType: "appointment",
        queuePosition: null,
        estimatedWaitTime: 0,
        price: 1200,
        couponId: null,
        paymentId: "PAY-006",
        checkIn: {
          status: "checked_in",
          checkedInAt: new Date("2026-08-30T11:55:00"),
          checkedInBy: "STF-005"
        },
        status: "completed"
      },

      {
        appointmentId: "APT-007",
        customerId: "CUS-007",
        salonId: "SAL-003",
        serviceId: "SRV-016",
        staffId: "STF-011",
        appointmentDate: new Date("2026-08-31"),
        startTime: "17:00",
        endTime: "17:30",
        bookingType: "walk_in",
        queuePosition: null,
        estimatedWaitTime: 0,
        price: 300,
        couponId: null,
        paymentId: "PAY-007",
        checkIn: {
          status: "checked_in",
          checkedInAt: new Date("2026-08-31T16:50:00"),
          checkedInBy: "STF-013"
        },
        status: "completed"
      },

      {
        appointmentId: "APT-008",
        customerId: "CUS-008",
        salonId: "SAL-002",
        serviceId: "SRV-011",
        staffId: "STF-007",
        appointmentDate: new Date("2026-09-01"),
        startTime: "11:00",
        endTime: "12:15",
        bookingType: "appointment",
        queuePosition: null,
        estimatedWaitTime: 0,
        price: 1800,
        couponId: null,
        paymentId: "PAY-008",
        checkIn: {
          status: "checked_in",
          checkedInAt: new Date("2026-09-01T10:55:00"),
          checkedInBy: "STF-009"
        },
        status: "completed"
      },

      {
        appointmentId: "APT-009",
        customerId: "CUS-009",
        salonId: "SAL-001",
        serviceId: "SRV-008",
        staffId: "STF-004",
        appointmentDate: new Date("2026-09-02"),
        startTime: "18:00",
        endTime: "19:00",
        bookingType: "appointment",
        queuePosition: null,
        estimatedWaitTime: 0,
        price: 800,
        couponId: null,
        paymentId: "PAY-009",
        checkIn: {
          status: "checked_in",
          checkedInAt: new Date("2026-09-02T17:50:00"),
          checkedInBy: "STF-005"
        },
        status: "completed"
      },

      {
        appointmentId: "APT-010",
        customerId: "CUS-010",
        salonId: "SAL-002",
        serviceId: "SRV-010",
        staffId: "STF-006",
        appointmentDate: new Date("2026-09-03"),
        startTime: "13:00",
        endTime: "15:30",
        bookingType: "appointment",
        queuePosition: null,
        estimatedWaitTime: 0,
        price: 2200,
        couponId: "CPN-003",
        paymentId: "PAY-010",
        checkIn: {
          status: "checked_in",
          checkedInAt: new Date("2026-09-03T12:50:00"),
          checkedInBy: "STF-009"
        },
        status: "completed"
      },

      {
        appointmentId: "APT-011",
        customerId: "CUS-011",
        salonId: "SAL-003",
        serviceId: "SRV-017",
        staffId: "STF-011",
        appointmentDate: new Date("2026-09-04"),
        startTime: "15:00",
        endTime: "15:40",
        bookingType: "appointment",
        queuePosition: null,
        estimatedWaitTime: 0,
        price: 500,
        couponId: null,
        paymentId: "PAY-011",
        checkIn: {
          status: "checked_in",
          checkedInAt: new Date("2026-09-04T14:55:00"),
          checkedInBy: "STF-013"
        },
        status: "completed"
      },

      {
        appointmentId: "APT-012",
        customerId: "CUS-012",
        salonId: "SAL-002",
        serviceId: "SRV-012",
        staffId: "STF-007",
        appointmentDate: new Date("2026-09-05"),
        startTime: "16:00",
        endTime: "17:30",
        bookingType: "appointment",
        queuePosition: null,
        estimatedWaitTime: 0,
        price: 1200,
        couponId: null,
        paymentId: null,
        checkIn: {
          status: "not_checked_in",
          checkedInAt: null,
          checkedInBy: null
        },
        status: "confirmed"
      },

      {
        appointmentId: "APT-013",
        customerId: "CUS-001",
        salonId: "SAL-003",
        serviceId: "SRV-015",
        staffId: "STF-010",
        appointmentDate: new Date("2026-09-08"),
        startTime: "11:00",
        endTime: "11:50",
        bookingType: "appointment",
        queuePosition: null,
        estimatedWaitTime: 0,
        price: 600,
        couponId: null,
        paymentId: null,
        checkIn: {
          status: "not_checked_in",
          checkedInAt: null,
          checkedInBy: null
        },
        status: "confirmed"
      },

      {
        appointmentId: "APT-014",
        customerId: "CUS-004",
        salonId: "SAL-001",
        serviceId: "SRV-006",
        staffId: "STF-003",
        appointmentDate: new Date("2026-09-08"),
        startTime: "14:00",
        endTime: "15:30",
        bookingType: "appointment",
        queuePosition: 2,
        estimatedWaitTime: 20,
        price: 2500,
        couponId: "CPN-001",
        paymentId: null,
        checkIn: {
          status: "checked_in",
          checkedInAt: new Date("2026-09-08T13:50:00"),
          checkedInBy: "STF-005"
        },
        status: "waiting"
      },

      {
        appointmentId: "APT-015",
        customerId: "CUS-007",
        salonId: "SAL-003",
        serviceId: "SRV-016",
        staffId: null,
        appointmentDate: new Date("2026-09-08"),
        startTime: "17:30",
        endTime: "18:00",
        bookingType: "queue",
        queuePosition: 4,
        estimatedWaitTime: 45,
        price: 300,
        couponId: null,
        paymentId: null,
        checkIn: {
          status: "checked_in",
          checkedInAt: new Date("2026-09-08T17:05:00"),
          checkedInBy: "STF-013"
        },
        status: "waiting"
      }
    ];

    await Appointment.insertMany(appointments);

    console.log("✓ Appointments seeded");

    // --------------------------------------------------
    // PAYMENTS
    // --------------------------------------------------

    const payments = [
      {
        paymentId: "PAY-001",
        appointmentId: "APT-001",
        customerId: "CUS-001",
        salonId: "SAL-001",
        amount: 500,
        paymentGateway: "razorpay",
        transactionId: "rzp_demo_001",
        paymentMethod: "upi",
        status: "paid",
        paymentTime: new Date("2026-08-25T10:50:00")
      },

      {
        paymentId: "PAY-002",
        appointmentId: "APT-002",
        customerId: "CUS-002",
        salonId: "SAL-001",
        amount: 1200,
        paymentGateway: "razorpay",
        transactionId: "rzp_demo_002",
        paymentMethod: "card",
        status: "paid",
        paymentTime: new Date("2026-08-26T12:10:00")
      },

      {
        paymentId: "PAY-003",
        appointmentId: "APT-003",
        customerId: "CUS-003",
        salonId: "SAL-003",
        amount: 450,
        paymentGateway: "cash",
        transactionId: null,
        paymentMethod: "cash",
        status: "paid",
        paymentTime: new Date("2026-08-27T14:45:00")
      },

      {
        paymentId: "PAY-004",
        appointmentId: "APT-004",
        customerId: "CUS-004",
        salonId: "SAL-002",
        amount: 7225,
        paymentGateway: "razorpay",
        transactionId: "rzp_demo_004",
        paymentMethod: "upi",
        status: "paid",
        paymentTime: new Date("2026-08-28T18:15:00")
      },

      {
        paymentId: "PAY-005",
        appointmentId: "APT-005",
        customerId: "CUS-005",
        salonId: "SAL-003",
        amount: 500,
        paymentGateway: "razorpay",
        transactionId: "rzp_demo_005",
        paymentMethod: "card",
        status: "paid",
        paymentTime: new Date("2026-08-29T17:00:00")
      },

      {
        paymentId: "PAY-006",
        appointmentId: "APT-006",
        customerId: "CUS-006",
        salonId: "SAL-001",
        amount: 1200,
        paymentGateway: "razorpay",
        transactionId: "rzp_demo_006",
        paymentMethod: "upi",
        status: "paid",
        paymentTime: new Date("2026-08-30T13:30:00")
      },

      {
        paymentId: "PAY-007",
        appointmentId: "APT-007",
        customerId: "CUS-007",
        salonId: "SAL-003",
        amount: 300,
        paymentGateway: "cash",
        transactionId: null,
        paymentMethod: "cash",
        status: "paid",
        paymentTime: new Date("2026-08-31T17:40:00")
      },

      {
        paymentId: "PAY-008",
        appointmentId: "APT-008",
        customerId: "CUS-008",
        salonId: "SAL-002",
        amount: 1800,
        paymentGateway: "razorpay",
        transactionId: "rzp_demo_008",
        paymentMethod: "upi",
        status: "paid",
        paymentTime: new Date("2026-09-01T12:30:00")
      },

      {
        paymentId: "PAY-009",
        appointmentId: "APT-009",
        customerId: "CUS-009",
        salonId: "SAL-001",
        amount: 800,
        paymentGateway: "razorpay",
        transactionId: "rzp_demo_009",
        paymentMethod: "card",
        status: "paid",
        paymentTime: new Date("2026-09-02T19:15:00")
      },

      {
        paymentId: "PAY-010",
        appointmentId: "APT-010",
        customerId: "CUS-010",
        salonId: "SAL-002",
        amount: 1870,
        paymentGateway: "razorpay",
        transactionId: "rzp_demo_010",
        paymentMethod: "upi",
        status: "paid",
        paymentTime: new Date("2026-09-03T15:45:00")
      },

      {
        paymentId: "PAY-011",
        appointmentId: "APT-011",
        customerId: "CUS-011",
        salonId: "SAL-003",
        amount: 500,
        paymentGateway: "cash",
        transactionId: null,
        paymentMethod: "cash",
        status: "paid",
        paymentTime: new Date("2026-09-04T16:00:00")
      }
    ];

    await Payment.insertMany(payments);

    console.log("✓ Payments seeded");

    // --------------------------------------------------
    // REVIEWS
    // --------------------------------------------------

    const reviews = [
      {
        reviewId: "REV-001",
        customerId: "CUS-001",
        salonId: "SAL-001",
        appointmentId: "APT-001",
        serviceId: "SRV-001",
        rating: 5,
        comment: "Excellent haircut and very professional service.",
        managerResponse:
          "Thank you for visiting Luxe Aura. We are glad you enjoyed the service!",
        status: "published"
      },

      {
        reviewId: "REV-002",
        customerId: "CUS-002",
        salonId: "SAL-001",
        appointmentId: "APT-002",
        serviceId: "SRV-004",
        rating: 5,
        comment: "The facial was amazing. My skin feels great.",
        managerResponse:
          "Thank you for your wonderful feedback!",
        status: "published"
      },

      {
        reviewId: "REV-003",
        customerId: "CUS-003",
        salonId: "SAL-003",
        appointmentId: "APT-003",
        serviceId: "SRV-014",
        rating: 4,
        comment: "Great haircut and friendly barber.",
        managerResponse: "",
        status: "published"
      },

      {
        reviewId: "REV-004",
        customerId: "CUS-004",
        salonId: "SAL-002",
        appointmentId: "APT-004",
        serviceId: "SRV-013",
        rating: 5,
        comment: "Absolutely loved my bridal makeup.",
        managerResponse:
          "Congratulations and thank you for trusting Urban Glow!",
        status: "published"
      },

      {
        reviewId: "REV-005",
        customerId: "CUS-005",
        salonId: "SAL-003",
        appointmentId: "APT-005",
        serviceId: "SRV-015",
        rating: 4,
        comment: "Clean fade and good experience.",
        managerResponse: "",
        status: "published"
      },

      {
        reviewId: "REV-006",
        customerId: "CUS-006",
        salonId: "SAL-001",
        appointmentId: "APT-006",
        serviceId: "SRV-003",
        rating: 5,
        comment: "Very relaxing hair spa.",
        managerResponse:
          "We appreciate your feedback. See you again!",
        status: "published"
      },

      {
        reviewId: "REV-007",
        customerId: "CUS-007",
        salonId: "SAL-003",
        appointmentId: "APT-007",
        serviceId: "SRV-016",
        rating: 3,
        comment: "Service was good but there was a small wait.",
        managerResponse:
          "We apologize for the wait and will work on improving queue times.",
        status: "published"
      },

      {
        reviewId: "REV-008",
        customerId: "CUS-008",
        salonId: "SAL-002",
        appointmentId: "APT-008",
        serviceId: "SRV-011",
        rating: 5,
        comment: "Beautiful salon and excellent facial.",
        managerResponse: "",
        status: "published"
      }
    ];

    await Review.insertMany(reviews);

    console.log("✓ Reviews seeded");

    // --------------------------------------------------
    // STAFF ATTENDANCE
    // --------------------------------------------------

    const attendance = [];

    const attendanceStaff = [
      "STF-001",
      "STF-002",
      "STF-003",
      "STF-004",
      "STF-005",
      "STF-006",
      "STF-007",
      "STF-008",
      "STF-009",
      "STF-010",
      "STF-011",
      "STF-012",
      "STF-013"
    ];

    const staffSalonMap = {
      "STF-001": "SAL-001",
      "STF-002": "SAL-001",
      "STF-003": "SAL-001",
      "STF-004": "SAL-001",
      "STF-005": "SAL-001",
      "STF-006": "SAL-002",
      "STF-007": "SAL-002",
      "STF-008": "SAL-002",
      "STF-009": "SAL-002",
      "STF-010": "SAL-003",
      "STF-011": "SAL-003",
      "STF-012": "SAL-003",
      "STF-013": "SAL-003"
    };

    let attendanceCounter = 1;

    for (const staffId of attendanceStaff) {
      for (let day = 1; day <= 5; day++) {
        const date = new Date(`2026-09-${String(day).padStart(2, "0")}T00:00:00`);

        const isLate =
          staffId === "STF-002" && day === 3;

        const isAbsent =
          staffId === "STF-006" && day === 4;

        attendance.push({
          attendanceId: `ATT-${String(attendanceCounter).padStart(3, "0")}`,
          staffId,
          salonId: staffSalonMap[staffId],
          date,
          checkIn: isAbsent
            ? null
            : new Date(
                `2026-09-${String(day).padStart(2, "0")}T${
                  isLate ? "10:18:00" : "09:05:00"
                }`
              ),
          checkOut: isAbsent
            ? null
            : new Date(
                `2026-09-${String(day).padStart(2, "0")}T18:05:00`
              ),
          workingMinutes: isAbsent ? 0 : isLate ? 467 : 540,
          status: isAbsent
            ? "absent"
            : isLate
            ? "late"
            : "present",
          notes: isAbsent
            ? "Sick leave"
            : isLate
            ? "Traffic delay"
            : ""
        });

        attendanceCounter++;
      }
    }

    await StaffAttendance.insertMany(attendance);

    console.log("✓ Staff attendance seeded");

    // --------------------------------------------------
    // FINAL SUMMARY
    // --------------------------------------------------

    const counts = await Promise.all([
      Salon.countDocuments(),
      Service.countDocuments(),
      Customer.countDocuments(),
      Staff.countDocuments(),
      Manager.countDocuments(),
      StaffAttendance.countDocuments(),
      Appointment.countDocuments(),
      Payment.countDocuments(),
      Review.countDocuments(),
      Coupon.countDocuments(),
      Inventory.countDocuments()
    ]);

    console.log("\n========================================");
    console.log("       VEXORA DATABASE SEEDED");
    console.log("========================================");

    console.log(`Salons:            ${counts[0]}`);
    console.log(`Services:          ${counts[1]}`);
    console.log(`Customers:         ${counts[2]}`);
    console.log(`Staff:             ${counts[3]}`);
    console.log(`Managers/Owners:   ${counts[4]}`);
    console.log(`Attendance:        ${counts[5]}`);
    console.log(`Appointments:      ${counts[6]}`);
    console.log(`Payments:          ${counts[7]}`);
    console.log(`Reviews:           ${counts[8]}`);
    console.log(`Coupons:           ${counts[9]}`);
    console.log(`Inventory:         ${counts[10]}`);

    console.log("========================================");

    console.log("\nDemo manager password:");
    console.log("Vexora@123");

    console.log("\nDemo manager emails:");
    console.log("arjun@luxeaura.com");
    console.log("priya@luxeaura.com");
    console.log("rohan@luxeaura.com");
    console.log("neha@urbanglow.com");
    console.log("karan@urbanglow.com");
    console.log("ananya@urbanglow.com");
    console.log("vikram@gentlemensclub.com");
    console.log("aditya@gentlemensclub.com");

    console.log("\nSeed completed successfully!");

    process.exit(0);
  } catch (error) {
    console.error("\nSeed failed:");
    console.error(error);

    process.exit(1);
  }
};

seedDatabase();