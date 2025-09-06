// vehicle.routes.js
import express from "express";
import VehicleController from "../controllers/vehicle.controller.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authorizeRole } from "../middlewares/role.middleware.js";

const router = express.Router();

// Protected routes
router.post("/", authenticateJWT, authorizeRole("driver"), asyncHandler(VehicleController.createVehicle));
router.get("/", authenticateJWT, authorizeRole("driver"), asyncHandler(VehicleController.getAllVehicles));
router.get("/:id", authenticateJWT,authorizeRole("driver"),  asyncHandler(VehicleController.getVehicleById));
router.put("/:id", authenticateJWT, authorizeRole("driver"), asyncHandler(VehicleController.updateVehicle));
router.delete("/:id", authenticateJWT,authorizeRole("driver"),  asyncHandler(VehicleController.deleteVehicle));

export default router;