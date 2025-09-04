// services/user.service.js
import UserRepository from "../repositories/user.reporisitory.js";
import ApiError from "../utils/ApiError.js";

export const getProfile = async (userId) => {  // Remove asyncHandler wrapper
  const user = await UserRepository.findById(userId);
  console.log("in", user);
  
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return user;
};