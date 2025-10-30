import { Router } from "express";
import RatingController from "../controllers/rating.controller.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authorizeRole } from "../middlewares/role.middleware.js";

const router = Router();

// router.use(authenticateJWT);

/**
 * @swagger
 * tags:
 *   name: Ratings
 *   description: Rating management for rides, allowing riders to rate and comment on completed rides
 */

/**
 * @swagger
 * /api/v1/ratings:
 *   post:
 *     summary: Create a new rating (Rider only)
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ride_id:
 *                 type: integer
 *                 example: 101
 *               rider_id:
 *                 type: integer
 *                 example: 1
 *               driver_id:
 *                 type: integer
 *                 example: 2
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: "Great ride!"
 *     responses:
 *       201:
 *         description: Rating created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", authenticateJWT, authorizeRole("rider"), asyncHandler(RatingController.createRating));

/**
 * @swagger
 * /api/v1/ratings/{id}:
 *   get:
 *     summary: Get rating by ID (Rider only)
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Rating ID (MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: Rating details
 *       404:
 *         description: Rating not found
 */
router.get("/:id", authenticateJWT, authorizeRole("rider"), asyncHandler(RatingController.getRatingById));

/**
 * @swagger
 * /api/v1/ratings/ride/{ride_id}:
 *   get:
 *     summary: Get all ratings for a ride (Rider only)
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: ride_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Ride ID (MySQL ride_id)
 *     responses:
 *       200:
 *         description: List of ratings for the ride
 *       404:
 *         description: No ratings found
 */
router.get("/ride/:ride_id", authenticateJWT, authorizeRole("rider"), asyncHandler(RatingController.getRatingsByRide));

/**
 * @swagger
 * /api/v1/ratings/{id}:
 *   put:
 *     summary: Update a rating by ID (Rider only)
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Rating ID (MongoDB ObjectId)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 4
 *               comment:
 *                 type: string
 *                 example: "Good ride, driver was friendly"
 *     responses:
 *       200:
 *         description: Rating updated successfully
 *       404:
 *         description: Rating not found
 */
router.put("/:id", authenticateJWT, authorizeRole("rider"), asyncHandler(RatingController.updateRating));

export default router;
