// vehicle.routes.js
import express from "express";
import VehicleController from "../controllers/vehicle.controller.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.post("/", authenticateJWT, asyncHandler(VehicleController.createVehicle));
router.get("/", authenticateJWT, asyncHandler(VehicleController.getAllVehicles));
router.get("/:id", authenticateJWT, asyncHandler(VehicleController.getVehicleById));
router.put("/:id", authenticateJWT, asyncHandler(VehicleController.updateVehicle));
router.delete("/:id", authenticateJWT, asyncHandler(VehicleController.deleteVehicle));

export default router;