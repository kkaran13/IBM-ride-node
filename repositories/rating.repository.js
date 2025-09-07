import Rating from "../models/mongodbmodels/rating.model.js";

class RatingRepository {
   async create(ratingData) {
    return await Rating.create(ratingData);
  }

   async findById(id) {
    return await Rating.findById(id);
  }

   async findByRide(ride_id) {
    return await Rating.find({ ride_id });
  }

   async findByRider(rider_id) {
    return await Rating.find({ rider_id });
  }

   async update(id, updateData) {
    return await Rating.findByIdAndUpdate(id, updateData, { new: true });
  }
}

export default new RatingRepository();
