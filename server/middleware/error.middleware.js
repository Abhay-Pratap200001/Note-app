import { ApiError } from "../utils/ApiError.js";

// backend/middlewares/error.middleware.js 
export const errorHandler = (err, _, res, next) => {

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors || [],
    });
  }

  // For unexpected errors
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};
