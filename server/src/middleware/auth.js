const jwt = require("jsonwebtoken");
const ApiError = require("../utils/apiError");

/**
 * Verifies the Bearer JWT token and attaches manager info to req.manager.
 */
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ApiError("No authentication token provided.", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.manager = decoded; // { managerId, salonId, role, permissions }
    next();
  } catch (err) {
    next(err); // JsonWebTokenError / TokenExpiredError handled by errorHandler
  }
};

/**
 * Gate access to owners only (role === "owner")
 */
const ownerOnly = (req, res, next) => {
  if (req.manager?.role !== "owner") {
    return next(new ApiError("Access denied. Owner role required.", 403));
  }
  next();
};

/**
 * Gate access by a specific permission string
 * @param {string} permission  e.g. "manage_staff"
 */
const requirePermission = (permission) => (req, res, next) => {
  const perms = req.manager?.permissions || [];
  if (!perms.includes(permission)) {
    return next(new ApiError(`Access denied. Missing permission: ${permission}`, 403));
  }
  next();
};

module.exports = { protect, ownerOnly, requirePermission };
