import { asyncHandler } from "../utils/asyncHandler.js";
import RideService from "../services/ride.service.js";
import ApiResponse from "../utils/ApiResponse.js";

class RideController {
  createRide = asyncHandler(async (req, res) => {
    const ride = await RideService.createRide(req.body, req.user.user_id);
    res.status(201).json(new ApiResponse(201, { rideId: ride.ride_id }, "Ride created successfully"));
  });

  getRide = asyncHandler(async (req, res) => {
    const ride = await RideService.getRide(req.params.id);
    res.status(200).json(new ApiResponse(200, ride));
  });

  listRides = asyncHandler(async (req, res) => {
    const rides = await RideService.listRides(req.user.user_id, req.user.role);
    res.status(200).json(new ApiResponse(200, rides));
  });

  updateStatus = asyncHandler(async (req, res) => {
    const ride = await RideService.updateRideStatus(
      req.params.id,
      req.body.status,
      req.user.user_id,
      req.user.role
    );
    res.status(200).json(new ApiResponse(200, ride, "Ride status updated"));
  });

  // ---------------- Driver Routes ----------------
  getPendingRides = asyncHandler(async (req, res) => {
    const rides = await RideService.getPendingRidesForDriver();
    res.status(200).json(new ApiResponse(200, rides, "Pending rides"));
  });

  acceptRide = asyncHandler(async (req, res) => {
    const { vehicle_id } = req.body;
    console.log(vehicle_id);
    const ride = await RideService.acceptRide(
      req.params.id, 
      req.user.user_id,  
      vehicle_id     
    );
    res.status(200).json(new ApiResponse(200, ride, "Ride accepted"));
  });


  getOngoingRides = asyncHandler(async (req, res) => {
    const rides = await RideService.getOngoingRides(req.user.user_id);
    res.status(200).json(new ApiResponse(200, rides, "Ongoing rides"));
  });

  getRideHistory = asyncHandler(async (req, res) => {
    const rides = await RideService.getRideHistory(req.user.user_id);
    res.status(200).json(new ApiResponse(200, rides, "Ride history"));
  });
}

export default new RideController();
