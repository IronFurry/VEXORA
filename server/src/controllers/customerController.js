const Customer = require("../models/Customer");
const Appointment = require("../models/Appointment");
const ApiError = require("../utils/apiError");
const { sendSuccess } = require("../utils/apiResponse");

/** GET /api/customers?search=name */
const getCustomers = async (req, res, next) => {
  try {
    const { salonId } = req.manager;
    // Find customers who have visited this salon
    const distinctCustomerIds = await Appointment.distinct("customerId", { salonId });

    const filter = { customerId: { $in: distinctCustomerIds } };
    if (req.query.search) {
      const rx = new RegExp(req.query.search, "i");
      filter.$or = [{ name: rx }, { phone: rx }, { email: rx }];
    }

    const customers = await Customer.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(req.query.limit) || 100);

    return sendSuccess(res, { customers, count: customers.length });
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
