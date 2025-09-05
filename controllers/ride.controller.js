import RideService from "../services/ride.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

class RideController {
  createRide = asyncHandler(async (req, res) => {
    const rideId = await RideService.createRide(req.body);
    res
      .status(201)
      const ride = await RideService.createRide(req.body);
      res
      .status(201)
      .json(new ApiResponse(201, {rideId }, "Ride created successfully"));
  });

  getRide = asyncHandler(async (req, res) => {
    const ride = await RideService.getRide(req.params.id);
    if (!ride) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Ride not found"));
    }
    res.status(200).json(new ApiResponse(200, ride));
  });

  updateStatus = asyncHandler(async (req, res) => {
    const updated = await RideService.updateRideStatus(
      req.params.id,
      req.body.status
    );
    if (!updated) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Ride not found"));
    }
    res
      .status(200)
      .json(new ApiResponse(200, null, "Ride status updated successfully"));
  });

  listRides = asyncHandler(async (req, res) => {
    const rides = await RideService.listRides();
    res.status(200).json(new ApiResponse(200, rides));
  });
}

export default new RideController();
