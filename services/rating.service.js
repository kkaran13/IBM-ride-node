// services/rating.service.js
import RatingRepository from "../repositories/rating.repository.js";
import ApiError from "../utils/ApiError.js";

export default class RatingService {
  static async createRating(data, user) {
    if (user.user_id !== data.rider_id && user.role !== "admin") {
      throw new ApiError(403, "You are not allowed to rate this ride");
    }
    return await RatingRepository.create(data);
  }

  static async getRatingById(id, user) {
    const rating = await RatingRepository.findById(id);
    if (!rating) throw new ApiError(404, "Rating not found");

    if (user.user_id !== rating.rider_id && user.role !== "admin") {
      throw new ApiError(403, "You are not allowed to access this rating");
    }
    return rating;
  }

  static async getRatingsByRide(ride_id, user) {
    return await RatingRepository.findByRide(ride_id);
  }

  static async updateRating(id, updateData, user) {
    const rating = await RatingRepository.findById(id);
    if (!rating) throw new ApiError(404, "Rating not found");

    if (user.user_id !== rating.rider_id && user.role !== "admin") {
      throw new ApiError(403, "You are not allowed to update this rating");
    }

    return await RatingRepository.update(id, updateData);
  }
}
