
import Rating from "../models/mongodbmodels/rating.model.js";

export default class RatingRepository {
  static async create(ratingData) {
    return await Rating.create(ratingData);
  }

  static async findById(id) {
    return await Rating.findById(id);
  }

  static async findByRide(ride_id) {
    return await Rating.find({ ride_id });
  }

  static async findByRider(rider_id) {
    return await Rating.find({ rider_id });
  }

  static async update(id, updateData) {
    return await Rating.findByIdAndUpdate(id, updateData, { new: true });
  }
}
