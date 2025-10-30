import RatingRepository from "../repositories/rating.repository.js";
import RideRepository from "../repositories/ride.repository.js";
import PaymentRepository from "../repositories/payment.repository.js";
import ApiError from "../utils/ApiError.js";

class RatingService {
  async createRating(data, user) {

    if (!data || !data.ride_id || !data.rating) {
      throw new ApiError(400, "ride_id and rating are required");
    }

    const ratingExist = await RatingRepository.findByRide(data.ride_id)
    if (ratingExist) {
      throw new ApiError(400,"rating already Exist")
    }

    const ride = await RideRepository.findById(data.ride_id);
    if (!ride) {
      throw new ApiError(404, "Ride not found");
    }

    const { rider_id, driver_id ,status} = ride;
    
    if (user.user_id !== rider_id) {
      throw new ApiError(403, "You are not allowed to rate this ride");
    }

    if (status !== "completed") {
      throw new ApiError(403,"You can't rate a ride withour completing it...")
    }

    const payment = await PaymentRepository.findByRideId(data.ride_id)

    if(payment.status !== "completed") {
      throw new ApiError(403 , "You can't rate a ride without completing payment...")
    }

    const ratingDoc = {
      ride_id: data.ride_id,
      rider_id,
      driver_id,
      rating: data.rating,
      comment: data.comment || ""
    };

    return await RatingRepository.create(ratingDoc);
  }

   async getRatingById(id, user) {
    const rating = await RatingRepository.findById(id);
    if (!rating) throw new ApiError(404, "Rating not found");

    if (user.user_id !== rating.rider_id && user.role !== "admin") {
      throw new ApiError(403, "You are not allowed to access this rating");
    }
    return rating;
  }

   async getRatingsByRide(ride_id, user) {
    return await RatingRepository.findByRide(ride_id);
  }

   async updateRating(id, updateData, user) {
    if (!id || !updateData) {
      throw new ApiError(403,"ID and Data is required")
    }

    const rating = await RatingRepository.findById(id);
    console.log(rating);
    if (!rating) throw new ApiError(404, "Rating not found");

    if (user.user_id !== rating.rider_id) {
      throw new ApiError(403, "You are not allowed to update this rating");
    }

    return await RatingRepository.update(id, updateData);
  }
}

export default new RatingService();
