const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Manager = require("../models/Manager");
const ApiError = require("../utils/apiError");
const { sendSuccess } = require("../utils/apiResponse");

/**
 * POST /api/auth/login
 * Body: { email, password }
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError("Email and password are required.", 400);
    }

    const manager = await Manager.findOne({ email: email.toLowerCase().trim() });

    if (!manager) {
      throw new ApiError("Invalid email or password.", 401);
    }

    if (manager.status !== "active") {
      throw new ApiError("Your account is inactive. Please contact the owner.", 403);
    }

    const isMatch = await bcrypt.compare(password, manager.passwordHash);

    if (!isMatch) {
      throw new ApiError("Invalid email or password.", 401);
    }

    const payload = {
      managerId: manager.managerId,
      salonId: manager.salonId,
      role: manager.role,
      permissions: manager.permissions,
      name: manager.name
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d"
    });

    return sendSuccess(
      res,
      {
        token,
        manager: {
          managerId: manager.managerId,
          name: manager.name,
          email: manager.email,
          role: manager.role,
          salonId: manager.salonId,
          permissions: manager.permissions
        }
      },
      "Login successful."
    );
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/auth/me
 * Returns the currently logged-in manager's profile.
 */
const getMe = async (req, res, next) => {
  try {
    const manager = await Manager.findOne(
      { managerId: req.manager.managerId },
      "-passwordHash"
    );

    if (!manager) {
      throw new ApiError("Manager not found.", 404);
    }

    return sendSuccess(res, { manager }, "Manager profile retrieved.");
  } catch (err) {
    next(err);
  }
};

module.exports = { login, getMe };
