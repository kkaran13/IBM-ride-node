import { asyncHandler } from "../utils/asyncHandler.js";
import { getProfile } from "../services/user.service.js";
import  ApiError  from "../utils/ApiError.js";
import  ApiResponse from "../utils/ApiResponse.js";

export const healthCheck = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await getProfile(userId); // may throw ApiError
  res.status(200).json(new ApiResponse(200, user, "User profile fetched"));
});