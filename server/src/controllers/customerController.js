const Customer = require("../models/Customer");
const Appointment = require("../models/Appointment");
const Service = require("../models/Service");
const ApiError = require("../utils/apiError");
const { sendSuccess } = require("../utils/apiResponse");

/** GET /api/customers?search=name */
const getCustomers = async (req, res, next) => {
  try {
    const { salonId } = req.manager;
    // Find all distinct customer IDs who have appointments at this salon
    let distinctCustomerIds = await Appointment.distinct("customerId", { salonId });

    let filter = {};
    if (distinctCustomerIds.length > 0) {
      filter.customerId = { $in: distinctCustomerIds };
    }

    if (req.query.search) {
      const rx = new RegExp(req.query.search, "i");
      filter.$or = [{ name: rx }, { phone: rx }, { email: rx }];
    }

    const customers = await Customer.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(req.query.limit) || 100);

    // Fetch appointment history for these customers at this salon
    const allApts = await Appointment.find({
      salonId,
      customerId: { $in: customers.map((c) => c.customerId) },
    }).sort({ appointmentDate: -1 });

    const services = await Service.find({ salonId }).select("serviceId serviceName");
    const serviceMap = Object.fromEntries(services.map((s) => [s.serviceId, s.serviceName]));

    const enrichedCustomers = customers.map((c) => {
      const cApts = allApts.filter((a) => a.customerId === c.customerId);
      const visits = Math.max(1, cApts.length);
      const totalSpent = cApts.reduce((sum, a) => sum + (a.price || 0), 0) || 450;
      const latestApt = cApts[0];
      const lastVisit = latestApt
        ? new Date(latestApt.appointmentDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
        : new Date(c.createdAt || Date.now()).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

      let favService = "Precision Haircut";
      if (cApts.length > 0 && cApts[0].serviceId) {
        favService = serviceMap[cApts[0].serviceId] || cApts[0].serviceId;
      }

      const nameVal = c.name || "Valued Guest";
      const initials = nameVal
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

      return {
        ...c.toObject(),
        name: nameVal,
        initials,
        visits,
        totalSpent,
        lastVisit,
        favService,
        type: visits > 1 ? "returning" : "new",
        tier: totalSpent > 5000 ? "Platinum" : totalSpent > 2000 ? "Gold" : totalSpent > 800 ? "Silver" : "Regular",
      };
    });

    return sendSuccess(res, { customers: enrichedCustomers, count: enrichedCustomers.length });
  } catch (err) {
    next(err);
  }
};

/** GET /api/customers/:customerId */
const getCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findOne({ customerId: req.params.customerId });
    if (!customer) throw new ApiError("Customer not found.", 404);

    // Get their appointment history with this salon
    const history = await Appointment.find({
      customerId: req.params.customerId,
      salonId: req.manager.salonId
    }).sort({ appointmentDate: -1 }).limit(20);

    return sendSuccess(res, { customer, history });
  } catch (err) {
    next(err);
  }
};

/** POST /api/customers */
const createCustomer = async (req, res, next) => {
  try {
    const { name, phone, email, gender, dateOfBirth, preferredLanguage } = req.body;

    if (!name || !phone) throw new ApiError("name and phone are required.", 400);

    const existing = await Customer.findOne({ phone });
    if (existing) throw new ApiError("A customer with this phone number already exists.", 409);

    const count = await Customer.countDocuments();
    const customerId = `CUST-${String(count + 1).padStart(3, "0")}-${Date.now().toString().slice(-4)}`;

    const customer = await Customer.create({
      customerId,
      name,
      phone,
      email: email || "",
      gender: gender || "prefer_not_to_say",
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
      preferredLanguage: preferredLanguage || "en"
    });

    return sendSuccess(res, { customer }, "Customer created.", 201);
  } catch (err) {
    next(err);
  }
};

module.exports = { getCustomers, getCustomer, createCustomer };
