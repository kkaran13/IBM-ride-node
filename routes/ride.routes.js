import express from "express";
import RideController from "../controllers/ride.controller.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authorizeRole } from "../middlewares/role.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Rides
 *   description: Ride management for riders and drivers, including ride requests, status updates, and ride history
 */

/**
 * @swagger
 * /api/v1/rides:
 *   post:
 *     summary: Create a new ride (Rider only)
 *     tags: [Rides]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pickup_location:
 *                 type: string
 *                 example: Airport
 *               drop_location:
 *                 type: string
 *                 example: Downtown
 *     responses:
 *       201:
 *         description: Ride created successfully
 *       400:
 *         description: Bad request
 */
router.post("/", authenticateJWT, asyncHandler(RideController.createRide));

/**
 * @swagger
 * /api/v1/rides/listrides:
 *   get:
 *     summary: Get all rides for logged-in user (Rider or Driver)
 *     tags: [Rides]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of rides
 */
router.get("/listrides", authenticateJWT, asyncHandler(RideController.listRides));

/**
 * @swagger
 * /api/v1/rides/{id}:
 *   get:
 *     summary: Get ride details by ID
 *     tags: [Rides]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Ride ID
 *     responses:
 *       200:
 *         description: Ride details
 *       404:
 *         description: Ride not found
 */
router.get("/:id", authenticateJWT, asyncHandler(RideController.getRide));

/**
 * @swagger
 * /api/v1/rides/{id}/status:
 *   patch:
 *     summary: Update ride status (Driver only)
 *     tags: [Rides]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Ride ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, in_progress, completed, cancelled]
 *                 example: completed
 *     responses:
 *       200:
 *         description: Ride status updated
 *       403:
 *         description: Forbidden
 */
router.patch("/:id/status", authenticateJWT, authorizeRole("driver"), asyncHandler(RideController.updateStatus));

/**
 * @swagger
 * /api/v1/rides/driver/pending:
 *   get:
 *     summary: Get all pending rides (Driver only)
 *     tags: [Rides]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of pending rides
 */
router.get("/driver/pending", authenticateJWT, authorizeRole("driver"), asyncHandler(RideController.getPendingRides));

/**
 * @swagger
 * /api/v1/rides/driver/{id}/accept:
 *   post:
 *     summary: Accept a ride by ID (Driver only)
 *     tags: [Rides]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Ride ID
 *     responses:
 *       200:
 *         description: Ride accepted
 *       403:
 *         description: Forbidden
 */
router.post("/driver/:id/accept", authenticateJWT, authorizeRole("driver"), asyncHandler(RideController.acceptRide));

/**
 * @swagger
 * /api/v1/rides/driver/ongoing:
 *   get:
 *     summary: Get ongoing rides for driver
 *     tags: [Rides]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of ongoing rides
 */
router.get("/driver/ongoing", authenticateJWT, authorizeRole("driver"), asyncHandler(RideController.getOngoingRides));

/**
 * @swagger
 * /api/v1/rides/driver/history:
 *   get:
 *     summary: Get ride history for driver
 *     tags: [Rides]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of past rides
 */
router.get("/driver/history", authenticateJWT, authorizeRole("driver"), asyncHandler(RideController.getRideHistory));

export default router;
