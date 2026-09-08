const Salon = require("../models/Salon");
const Service = require("../models/Service");
const Staff = require("../models/Staff");
const Appointment = require("../models/Appointment");
const Customer = require("../models/Customer");
const queueEngine = require("./queueEngine");
const notificationService = require("./notificationService");

/**
 * Tool 1: List active salons
 */
async function listSalons() {
  const salons = await Salon.find({ status: "active" }).select(
    "salonId salonName description location rating workingHours"
  );
  return salons.map((s) => ({
    salonId: s.salonId,
    name: s.salonName,
    address: s.location?.address || "",
    rating: s.rating,
  }));
}

/**
 * Tool 2: List services for a salon
 */
async function listServices(salonIdentifier) {
  let salon = await Salon.findOne({
    $or: [
      { salonId: salonIdentifier },
      { salonName: new RegExp(salonIdentifier, "i") },
    ],
  });

  const query = salon ? { salonId: salon.salonId, status: "active" } : { status: "active" };
  const services = await Service.find(query).select("serviceId serviceName category price duration");
  return {
    salonName: salon?.salonName || "Salon",
    salonId: salon?.salonId,
    services: services.map((s) => ({
      serviceId: s.serviceId,
      name: s.serviceName,
      category: s.category,
      price: s.price,
      durationMinutes: s.duration,
    })),
  };
}

/**
 * Tool 3: List stylists/staff for a salon
 */
async function listStylists(salonIdentifier) {
  let salon = await Salon.findOne({
    $or: [
      { salonId: salonIdentifier },
      { salonName: new RegExp(salonIdentifier, "i") },
    ],
  });

  const query = salon ? { salonId: salon.salonId, status: "active" } : { status: "active" };
  const staff = await Staff.find(query).select("staffId name role rating specialization schedule");
  return {
    salonName: salon?.salonName || "Salon",
    salonId: salon?.salonId,
    stylists: staff.map((st) => ({
      staffId: st.staffId,
      name: st.name,
      role: st.role,
      rating: st.rating || 4.8,
      specialization: st.specialization,
    })),
  };
}

/**
 * Tool 4: Check live queue status
 */
async function checkQueue(salonIdentifier) {
  let salon = await Salon.findOne({
    $or: [
      { salonId: salonIdentifier },
      { salonName: new RegExp(salonIdentifier, "i") },
    ],
  });

  if (!salon) salon = await Salon.findOne({ salonId: "SAL-PLG-002" });

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const activeAppointments = await Appointment.find({
    salonId: salon.salonId,
    appointmentDate: { $gte: todayStart, $lte: todayEnd },
    status: { $in: ["waiting", "confirmed", "checked_in", "in_service"] },
  }).sort({ queuePosition: 1 });

  const inService = activeAppointments.filter((a) => a.status === "in_service").length;
  const waiting = activeAppointments.filter((a) => a.status !== "in_service").length;
  const estWait = waiting * 15;

  return {
    salonName: salon.salonName,
    activeQueueCount: activeAppointments.length,
    customersInService: inService,
    customersWaiting: waiting,
    estimatedWaitMinutes: estWait,
  };
}

/**
 * Tool 5: Book an Appointment & Digital Queue Ticket in MongoDB
 */
async function bookAppointment({
  customerName,
  phone,
  salonIdentifier = "SAL-PLG-002",
  serviceKeywords = [],
  stylistName = null,
  preferredTime = null,
}) {
  if (!customerName || !phone) {
    throw new Error("customerName and phone are required to book an appointment.");
  }

  // 1. Resolve Salon (default: Vasai Cuts & Co)
  let salon = await Salon.findOne({
    $or: [
      { salonId: salonIdentifier },
      { salonName: new RegExp(salonIdentifier, "i") },
    ],
    status: "active",
  });
  if (!salon) {
    salon = await Salon.findOne({ salonId: "SAL-PLG-002" }) || await Salon.findOne();
  }

  // 2. Resolve Services
  const salonServices = await Service.find({ salonId: salon.salonId, status: "active" });
  let matchedServices = [];

  if (Array.isArray(serviceKeywords) && serviceKeywords.length > 0) {
    for (const kw of serviceKeywords) {
      const found = salonServices.find(
        (s) =>
          s.serviceName.toLowerCase().includes(kw.toLowerCase()) ||
          s.category.toLowerCase().includes(kw.toLowerCase()) ||
          s.serviceId.toLowerCase() === kw.toLowerCase()
      );
      if (found && !matchedServices.some((m) => m.serviceId === found.serviceId)) {
        matchedServices.push(found);
      }
    }
  }

  // Fallback to first available haircut/service if none matched
  if (matchedServices.length === 0) {
    matchedServices = [salonServices[0] || { serviceId: "SRV-HC-01", serviceName: "Precision Haircut", price: 450, duration: 30 }];
  }

  const totalPrice = matchedServices.reduce((sum, s) => sum + (s.price || 0), 0);
  const totalDuration = matchedServices.reduce((sum, s) => sum + (s.duration || 30), 0);
  const serviceNames = matchedServices.map((s) => s.serviceName).join(" + ");
  const primaryService = matchedServices[0];

  // 3. Resolve Stylist
  let staffMember = null;
  if (stylistName) {
    staffMember = await Staff.findOne({
      salonId: salon.salonId,
      name: new RegExp(stylistName, "i"),
    });
  }
  if (!staffMember) {
    staffMember = await Staff.findOne({ salonId: salon.salonId, status: "active" });
  }

  // 4. Resolve or create Customer
  let customer = await Customer.findOne({ phone });
  if (!customer) {
    const custCount = await Customer.countDocuments();
    customer = await Customer.create({
      customerId: `CUST-AI-${Date.now().toString().slice(-5)}`,
      name: customerName,
      phone,
    });
  }

  // 5. Calculate queue position and wait time
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const lastInQueue = await Appointment.findOne({
    salonId: salon.salonId,
    appointmentDate: { $gte: todayStart, $lte: todayEnd },
    status: { $in: ["waiting", "confirmed", "checked_in"] },
  }).sort({ queuePosition: -1 });

  const nextPos = (lastInQueue?.queuePosition || 0) + 1;
  const estimatedWaitTime = Math.max(0, (nextPos - 1) * 15);

  const now = new Date();
  const startTime = preferredTime || `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  const endDate = new Date(now.getTime() + totalDuration * 60000);
  const endTime = `${String(endDate.getHours()).padStart(2, "0")}:${String(endDate.getMinutes()).padStart(2, "0")}`;

  const aptCount = await Appointment.countDocuments();
  const appointmentId = `APT-AI-${String(aptCount + 1).padStart(3, "0")}-${Date.now().toString().slice(-4)}`;

  const arriveByTarget = new Date(Date.now() + estimatedWaitTime * 60000);
  let arrH = arriveByTarget.getHours();
  const arrM = String(arriveByTarget.getMinutes()).padStart(2, "0");
  const arrAmpm = arrH >= 12 ? "PM" : "AM";
  arrH = arrH % 12 || 12;
  const arriveBy = `${arrH}:${arrM} ${arrAmpm}`;

  const appointment = await Appointment.create({
    appointmentId,
    customerId: customer.customerId,
    salonId: salon.salonId,
    serviceId: primaryService.serviceId,
    staffId: staffMember?.staffId || null,
    appointmentDate: now,
    startTime,
    endTime,
    bookingType: "queue",
    queuePosition: nextPos,
    estimatedWaitTime,
    price: totalPrice,
    status: "waiting",
    checkIn: { status: "not_checked_in" },
  });

  // Recalculate queue
  await queueEngine.recalculateQueue(salon.salonId);

  // Send notification simulation
  try {
    await notificationService.sendTicketConfirmation({
      phone,
      customerName,
      ticketNumber: appointmentId.split("-").slice(1).join("-"),
      salonName: salon.salonName,
      serviceName: serviceNames,
      queuePosition: nextPos,
      estimatedWaitTime,
      arriveBy,
    });
  } catch {}

  const ticketData = {
    appointmentId,
    ticketNumber: appointmentId.split("-").slice(1).join("-"),
    salonId: salon.salonId,
    salonName: salon.salonName,
    salonAddress: salon.location?.address || "",
    customerName,
    customerPhone: phone,
    serviceNames,
    serviceId: primaryService.serviceId,
    stylistName: staffMember?.name || "Any Stylist",
    queuePosition: nextPos,
    estimatedWaitTime,
    arriveBy,
    status: "waiting",
    totalPrice,
    createdAt: now.toISOString(),
  };

  const user = {
    phoneNumber: phone,
    name: customerName,
  };
  const invoiceUrl = `http://localhost:5173/ticket/${ticketData.ticketNumber}`;
  appointment.date = appointment.appointmentDate ? new Date(appointment.appointmentDate).toLocaleDateString() : new Date().toLocaleDateString();
  appointment.time = appointment.startTime || "10:00 AM";

  try {
    const notificationResponse = await fetch(
      "http://192.168.137.34:5000/api/notifications/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          phoneNumber: user.phoneNumber,
          type: "PAYMENT_SUCCESS",
          data: {
            userName: user.name,
            appointmentDate: appointment.date,
            appointmentTime: appointment.time,
            invoiceUrl: invoiceUrl
          }
        })
      }
    );

    console.log(
      "Notification response:",
      await notificationResponse.json()
    );

  } catch (error) {
    console.error(
      "Payment notification error:",
      error.message
    );
  }

  return ticketData;
}

/**
 * Intelligent Native NLP Engine (Handles booking and intent understanding reliably)
 */
async function processWithNativeNLP(userMessage, context = {}) {
  const msg = userMessage.toLowerCase();

  // Check if booking intent
  const isBookingIntent =
    msg.includes("book") ||
    msg.includes("appointment") ||
    msg.includes("reserve") ||
    msg.includes("ticket") ||
    msg.includes("cut my hair") ||
    msg.includes("want a hair") ||
    msg.includes("need a hair");

  // Extract phone number if present
  const phoneMatch = userMessage.match(/(?:\+91[\-\s]?)?[6-9]\d{9}/);
  const phone = phoneMatch ? phoneMatch[0].replace(/[\s\-]/g, "") : context.phone || null;

  // Extract customer name if specified (e.g. "for Rahul" or "name is Rohit")
  const nameMatch =
    userMessage.match(/(?:for|name is|i am|this is)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i) ||
    userMessage.match(/^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)$/);
  const customerName = nameMatch ? nameMatch[1] : context.customerName || "Customer";

  // Check salon preference (default Vasai Cuts & Co)
  let salonName = "Vasai Cuts & Co.";
  let salonId = "SAL-PLG-002";
  if (msg.includes("aura")) {
    salonName = "Aura Style Studio";
    salonId = "SAL-PLG-001";
  } else if (msg.includes("boisar")) {
    salonName = "Boisar Barber Republic";
    salonId = "SAL-PLG-003";
  }

  // Check stylist preference
  let stylistName = null;
  if (msg.includes("mahesh")) stylistName = "Mahesh More";
  else if (msg.includes("kavita")) stylistName = "Kavita Shinde";
  else if (msg.includes("priya")) stylistName = "Priya Desai";
  else if (msg.includes("rahul")) stylistName = "Rahul Gavit";

  // Check service keywords
  const serviceKeywords = [];
  if (msg.includes("haircut") || msg.includes("cut") || msg.includes("fade")) serviceKeywords.push("Haircut");
  if (msg.includes("beard") || msg.includes("shave") || msg.includes("trim")) serviceKeywords.push("Beard");
  if (msg.includes("facial") || msg.includes("face")) serviceKeywords.push("Facial");
  if (msg.includes("color") || msg.includes("colour")) serviceKeywords.push("Color");
  if (msg.includes("spa") || msg.includes("massage")) serviceKeywords.push("Spa");

  // If intent is booking and we have contact or can book directly:
  if (isBookingIntent) {
    // If phone is missing, ask for phone to complete booking
    if (!phone) {
      return {
        reply: `I'd be glad to book that for you at **${salonName}**! ✂️\n\nCould you please share your **phone number** and **name** so I can confirm your digital queue ticket?`,
        context: {
          pendingBooking: true,
          salonId,
          salonName,
          stylistName,
          serviceKeywords: serviceKeywords.length ? serviceKeywords : ["Haircut"],
        },
      };
    }

    // Execute booking
    try {
      const ticket = await bookAppointment({
        customerName,
        phone,
        salonIdentifier: salonId,
        serviceKeywords: serviceKeywords.length ? serviceKeywords : ["Haircut"],
        stylistName,
      });

      return {
        reply: `🎉 **Appointment Confirmed!**\n\nYour digital queue ticket has been issued for **${ticket.salonName}**.\n\n• **Ticket #:** ${ticket.ticketNumber}\n• **Customer:** ${ticket.customerName}\n• **Service:** ${ticket.serviceNames}\n• **Stylist:** ${ticket.stylistName}\n• **Queue Position:** #${ticket.queuePosition}\n• **Estimated Wait:** ~${ticket.estimatedWaitTime} mins\n• **Arrive By:** ${ticket.arriveBy}\n• **Total:** ₹${ticket.totalPrice}\n\nYour live pass is now active on your screen!`,
        booking: ticket,
      };
    } catch (err) {
      return {
        reply: `I encountered an issue booking your appointment: ${err.message}. Please try again or select your service from the catalog.`,
      };
    }
  }

  // Querying Stylists
  if (msg.includes("stylist") || msg.includes("barber") || msg.includes("team") || msg.includes("who works")) {
    const data = await listStylists(salonId);
    const list = data.stylists.map((s) => `• **${s.name}** (${s.role.replace(/_/g, " ")}) — Rating: ★${s.rating}`).join("\n");
    return {
      reply: `Here are the top stylists at **${data.salonName}**:\n\n${list}\n\nWould you like me to book your appointment with one of them? Just say: *"Book haircut with ${data.stylists[0]?.name}"*!`,
    };
  }

  // Querying Services or Pricing
  if (msg.includes("service") || msg.includes("price") || msg.includes("cost") || msg.includes("menu") || msg.includes("rate")) {
    const data = await listServices(salonId);
    const list = data.services.map((s) => `• **${s.name}** (${s.category}) — **₹${s.price}** (${s.durationMinutes} mins)`).join("\n");
    return {
      reply: `Here is the current service menu for **${data.salonName}**:\n\n${list}\n\nWould you like me to book any of these services for you?`,
    };
  }

  // Querying Queue or Wait Time
  if (msg.includes("queue") || msg.includes("wait") || msg.includes("busy") || msg.includes("line") || msg.includes("crowded")) {
    const data = await checkQueue(salonId);
    return {
      reply: `Current live queue at **${data.salonName}**:\n\n• **Waiting Customers:** ${data.customersWaiting}\n• **In Service:** ${data.customersInService}\n• **Estimated Wait Time:** ~${data.estimatedWaitMinutes} minutes\n\nWould you like to reserve your spot right now?`,
    };
  }

  // Querying Salons
  if (msg.includes("salon") || msg.includes("location") || msg.includes("where") || msg.includes("near me")) {
    const salons = await listSalons();
    const list = salons.map((s) => `• **${s.name}** — ${s.address} (★ ${s.rating})`).join("\n");
    return {
      reply: `Here are the active VEXORA salons in your area:\n\n${list}\n\nWhich salon would you like to visit? You can tell me to book at any of them!`,
    };
  }

  // General greeting / fallback
  return {
    reply: `Hello! I am **VEXORA AI**, your personal salon concierge. ✨\n\nI can help you:\n• **Book an appointment instantly** at **Vasai Cuts & Co.** or nearby studios\n• **Check live queue wait times**\n• **Browse service menus and pricing**\n• **Choose your preferred stylist**\n\nHow can I help you today? Try typing:\n👉 *"Book a precision haircut at Vasai Cuts for 4pm"*`,
  };
}

/**
 * Main chat handler: tries Gemini API with fallback to native NLP
 */
async function processCustomerChat({ message, history = [], context = {} }) {
  const keys = [process.env.GEMINI_API_KEY, process.env.GEMINI_BACKUP_API_KEY].filter(Boolean);

  for (const key of keys) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
        }),
      });

      if (res.status === 200) {
        const data = await res.json();
        const geminiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (geminiText) {
          // If Gemini generated text, also check if booking should be made
          const nlpResult = await processWithNativeNLP(message, context);
          return {
            reply: nlpResult.booking ? nlpResult.reply : geminiText,
            booking: nlpResult.booking || null,
          };
        }
      }
    } catch (err) {
      // Fall through to next key or native NLP
    }
  }

  // Native NLP Engine
  return await processWithNativeNLP(message, context);
}

module.exports = {
  processCustomerChat,
  bookAppointment,
  listSalons,
  listServices,
  listStylists,
  checkQueue,
};
