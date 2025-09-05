// vehicle.routes.js
import express from "express";
import VehicleController from "../controllers/vehicle.controller.js";
import { authenticateJWT, isDriver } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

// 🚘 Protected routes
router.post("/", authenticateJWT, isDriver, asyncHandler(VehicleController.createVehicle));
router.get("/", authenticateJWT, isDriver, asyncHandler(VehicleController.getAllVehicles));
router.get("/:id", authenticateJWT, isDriver, asyncHandler(VehicleController.getVehicleById));
router.put("/:id", authenticateJWT, isDriver, asyncHandler(VehicleController.updateVehicle));
router.delete("/:id", authenticateJWT, isDriver, asyncHandler(VehicleController.deleteVehicle));

export default router;