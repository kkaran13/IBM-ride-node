import express from "express";
import RideController from "../controllers/ride.controller.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authorizeRole } from "../middlewares/role.middleware.js";
const router = express.Router();

// ---------------- Rider Routes ----------------

router.post("/", authenticateJWT, asyncHandler(RideController.createRide));

router.get("/listrides", authenticateJWT, asyncHandler(RideController.listRides));

router.get("/:id", authenticateJWT, asyncHandler(RideController.getRide));

router.patch("/:id/status", authenticateJWT, asyncHandler(RideController.updateStatus));

// ---------------- Driver Routes ----------------

router.get("/driver/pending", authenticateJWT, authorizeRole("driver"), asyncHandler(RideController.getPendingRides));

router.post("/driver/:id/accept", authenticateJWT, authorizeRole("driver"), asyncHandler(RideController.acceptRide));

router.get("/driver/ongoing", authenticateJWT, authorizeRole("driver"),asyncHandler(RideController.getOngoingRides));

router.get("/driver/history", authenticateJWT, authorizeRole("driver"), asyncHandler(RideController.getRideHistory));

export default router;
