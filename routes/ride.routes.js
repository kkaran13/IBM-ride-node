import express from "express";
import RideController from "../controllers/ride.controller.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

// Public route - create a ride
router.post("/", authenticateJWT, asyncHandler(RideController.createRide));
// Protected routes
router.get("/listrides", authenticateJWT, asyncHandler(RideController.listRides));
router.get("/:id", authenticateJWT, asyncHandler(RideController.getRide));
router.patch("/:id/status", authenticateJWT, asyncHandler(RideController.updateStatus));
// router.delete("/:id", authenticateJWT, asyncHandler(RideController.deleteRide)); // optional

export default router;