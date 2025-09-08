import VehicleService from "../services/vehicle.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

class VehicleController {
  createVehicle = asyncHandler(async (req, res) => {
    const loggedInUserId = Number(req.user.user_id);
    const role = (req.user.role || "").toLowerCase();

    // Only drivers can create vehicles
    if (role !== "driver") {
      return res
        .status(403)
        .json(new ApiResponse(403, null, "Only drivers can create vehicles"));
    }

    // Check if driver is trying to spoof driver_id
    if (req.body.driver_id && Number(req.body.driver_id) !== loggedInUserId) {
      return res
        .status(403)
        .json(new ApiResponse(403, null, "You cannot assign a vehicle to another driver"));
    }

    // Force driver_id to logged-in driver
    const vehicleData = {
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      registration_number: req.body.registration_number,
      color: req.body.color,
      driver_id: loggedInUserId,
    };

    const vehicle = await VehicleService.createVehicle(vehicleData);

    return res
      .status(201)
      .json(new ApiResponse(201, vehicle, "Vehicle created successfully"));
  });


  // Read one: allow only owner
  getVehicleById = asyncHandler(async (req, res) => {
    const loggedInUserId = Number(req.user.user_id);
    const vehicle = await VehicleService.getVehicleById(req.params.id);

    if (!vehicle) {
      return res.status(404).json(new ApiResponse(404, null, "Vehicle not found"));
    }

    const driverId = Number(vehicle.driver_id);
    if (driverId !== loggedInUserId) {
      return res
        .status(403)
        .json(new ApiResponse(403, null, "Forbidden: You can only access your own vehicle"));
    }

    res.status(200).json(new ApiResponse(200, vehicle));
  });

  getAllVehicles = asyncHandler(async (req, res) => {
    const loggedInUserId = Number(req.user.user_id);
    const vehicles = await VehicleService.getVehiclesByDriver(loggedInUserId);
    res.status(200).json(new ApiResponse(200, vehicles));
  });

  updateVehicle = asyncHandler(async (req, res) => {
    const loggedInUserId = Number(req.user.user_id);
    const vehicle = await VehicleService.getVehicleById(req.params.id);

    if (!vehicle) {
      return res.status(404).json(new ApiResponse(404, null, "Vehicle not found"));
    }

    const driverId = Number(vehicle.driver_id);
    if (driverId !== loggedInUserId) {
      return res
        .status(403)
        .json(new ApiResponse(403, null, "Forbidden: You can only update your own vehicle"));
    }

    // Do not allow changing ownership
    const { driver_id, ...safeBody } = req.body || {};

    const updated = await VehicleService.updateVehicle(req.params.id, safeBody);
    res
      .status(200)
      .json(new ApiResponse(200, updated, "Vehicle updated successfully"));
  });

  deleteVehicle = asyncHandler(async (req, res) => {
    const loggedInUserId = Number(req.user.user_id);
    const vehicle = await VehicleService.getVehicleById(req.params.id);

    if (!vehicle) {
      return res.status(404).json(new ApiResponse(404, null, "Vehicle not found"));
    }

    const driverId = Number(vehicle.driver_id);
    if (driverId !== loggedInUserId) {
      return res
        .status(403)
        .json(new ApiResponse(403, null, "Forbidden: You can only delete your own vehicle"));
    }

    const result = await VehicleService.deleteVehicle(req.params.id);
    res.status(200).json(new ApiResponse(200, result));
  });
}

export default new VehicleController();