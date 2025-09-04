import ApiResponse from "../utils/ApiResponse.js";

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.statusCode) {
    // ApiError
    return res.status(err.statusCode).json(new ApiResponse(err.statusCode, null, err.message));
  }

  // unknown errors
  res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
};
