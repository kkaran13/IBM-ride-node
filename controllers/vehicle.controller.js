import VehicleService from "../services/vehicle.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

class VehicleController {
  createVehicle = asyncHandler(async (req, res) => {
    const vehicle = await VehicleService.createVehicle(req.body);
    res
      .status(201)
      .json(new ApiResponse(201, vehicle, "Vehicle created successfully"));
  });

  getVehicleById = asyncHandler(async (req, res) => {
    const loggedInUserId = req.user.user_id; // number from JWT
    const vehicle = await VehicleService.getVehicleById(req.params.id);

    if (!vehicle) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Vehicle not found"));
    }

    if (vehicle.driver_id !== loggedInUserId) {
      return res
        .status(403)
        .json(new ApiResponse(403, null, "Forbidden: You can only access your own vehicle"));
    }

    res.status(200).json(new ApiResponse(200, vehicle));
  });

  getAllVehicles = asyncHandler(async (req, res) => {
    const vehicles = await VehicleService.getAllVehicles();
    res.status(200).json(new ApiResponse(200, vehicles));
  });

  updateVehicle = asyncHandler(async (req, res) => {
    const loggedInUserId = req.user.user_id;
    const vehicle = await VehicleService.getVehicleById(req.params.id);

    if (!vehicle) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Vehicle not found"));
    }

    if (vehicle.driver_id !== loggedInUserId) {
      return res
        .status(403)
        .json(new ApiResponse(403, null, "Forbidden: You can only update your own vehicle"));
    }

    const updated = await VehicleService.updateVehicle(req.params.id, req.body);
    res
      .status(200)
      .json(new ApiResponse(200, updated, "Vehicle updated successfully"));
  });

  deleteVehicle = asyncHandler(async (req, res) => {
    const loggedInUserId = req.user.user_id;
    const vehicle = await VehicleService.getVehicleById(req.params.id);

    if (!vehicle) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Vehicle not found"));
    }

    if (vehicle.driver_id !== loggedInUserId) {
      return res
        .status(403)
        .json(new ApiResponse(403, null, "Forbidden: You can only delete your own vehicle"));
    }

    const result = await VehicleService.deleteVehicle(req.params.id);
    res.status(200).json(new ApiResponse(200, result));
  });
}

export default new VehicleController();