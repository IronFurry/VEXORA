const ApiError = require("../utils/apiError");

/**
 * Centralized Express error handler.
 * Must be registered LAST with app.use().
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Mongoose bad ObjectId / cast error
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid value for field: ${err.path}`;
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0] || "field";
    message = `Duplicate value for ${field}. Please use a different value.`;
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    statusCode = 422;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid authentication token.";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Authentication token has expired. Please log in again.";
  }

  // Don't leak internal details in production
  if (statusCode === 500 && !err.isOperational) {
    console.error("UNHANDLED ERROR:", err);
    message = "An unexpected error occurred.";
  }

  return res.status(statusCode).json({
    success: false,
    message
  });
};

module.exports = errorHandler;
