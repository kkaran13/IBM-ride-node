import {Schema,model} from "mongoose";

const ratingSchema = new Schema({
  ride_id: {
    type: Number,   // reference to MySQL ride.ride_id
    required: true,
    index: true
  },
  rider_id: {
    type: Number,   // reference to MySQL rider
    required: true
  },
  driver_id: {
    type: Number,   // reference to MySQL driver (if stored in MySQL)
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comment: {
    type: String,
    maxlength: 500,
    default: ""
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Rating = model("Rating", ratingSchema);

export default Rating;
