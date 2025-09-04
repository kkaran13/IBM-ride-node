import ApiResponse from "../utils/ApiResponse.js";

export const errorHandler = (err, req, res, next) => {

  if (err.statusCode) {
    // ApiError
    return res.status(err.statusCode).json(new ApiResponse(err.statusCode, null, err.message));
  }

  // unknown errors
  res.status(500).json(new ApiResponse(500, null, err.message));
};
