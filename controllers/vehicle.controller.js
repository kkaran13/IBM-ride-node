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
    const vehicle = await VehicleService.getVehicleById(req.params.id);
    res.status(200).json(new ApiResponse(200, vehicle));
  });

  getAllVehicles = asyncHandler(async (req, res) => {
    const vehicles = await VehicleService.getAllVehicles();
    res.status(200).json(new ApiResponse(200, vehicles));
  });

  updateVehicle = asyncHandler(async (req, res) => {
    const vehicle = await VehicleService.updateVehicle(req.params.id, req.body);
    res
      .status(200)
      .json(new ApiResponse(200, vehicle, "Vehicle updated successfully"));
  });

  deleteVehicle = asyncHandler(async (req, res) => {
    const result = await VehicleService.deleteVehicle(req.params.id);
    res.status(200).json(new ApiResponse(200, result));
  });
}

export default new VehicleController();
