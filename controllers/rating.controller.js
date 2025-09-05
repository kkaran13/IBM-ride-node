// controllers/rating.controller.js
import RatingService from "../services/rating.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export default class RatingController {
  static createRating = asyncHandler(async (req, res) => {
    const rating = await RatingService.createRating(req.body, req.user);
    res.status(201).json(new ApiResponse(201, rating, "Rating created successfully"));
  });

  static getRatingById = asyncHandler(async (req, res) => {
    const rating = await RatingService.getRatingById(req.params.id, req.user);
    res.status(200).json(new ApiResponse(200, rating, "Rating fetched successfully"));
  });

  static getRatingsByRide = asyncHandler(async (req, res) => {
    const ratings = await RatingService.getRatingsByRide(req.params.ride_id, req.user);
    res.status(200).json(new ApiResponse(200, ratings, "Ratings fetched successfully"));
  });

  static updateRating = asyncHandler(async (req, res) => {
    const rating = await RatingService.updateRating(req.params.id, req.body, req.user);
    res.status(200).json(new ApiResponse(200, rating, "Rating updated successfully"));
  });
}
