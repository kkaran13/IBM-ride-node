import express from "express";
import VehicleController from "../controllers/vehicle.controller.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authorizeRole } from "../middlewares/role.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Vehicles
 *   description: Vehicle management by drivers
 */

/**
 * @swagger
 * /api/v1/vehicles:
 *   post:
 *     summary: Create a new vehicle
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               driver_id:
 *                 type: integer
 *                 example: 1
 *               make:
 *                 type: string
 *                 example: Toyota
 *               model:
 *                 type: string
 *                 example: Corolla
 *               year:
 *                 type: integer
 *                 example: 2020
 *               registration_number:
 *                 type: string
 *                 example: GJ01AB1234
 *               color:
 *                 type: string
 *                 example: White
 *     responses:
 *       201:
 *         description: Vehicle created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", authenticateJWT, authorizeRole("driver"), asyncHandler(VehicleController.createVehicle));

/**
 * @swagger
 * /api/v1/vehicles:
 *   get:
 *     summary: Get all vehicles
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of vehicles
 */
router.get("/", authenticateJWT, authorizeRole("driver"), asyncHandler(VehicleController.getAllVehicles));

/**
 * @swagger
 * /api/v1/vehicles/{id}:
 *   get:
 *     summary: Get vehicle by ID
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Vehicle ID
 *     responses:
 *       200:
 *         description: Vehicle details
 *       404:
 *         description: Vehicle not found
 */
router.get("/:id", authenticateJWT, authorizeRole("driver"), asyncHandler(VehicleController.getVehicleById));

/**
 * @swagger
 * /api/v1/vehicles/{id}:
 *   put:
 *     summary: Update vehicle by ID
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Vehicle ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               make:
 *                 type: string
 *                 example: Honda
 *               model:
 *                 type: string
 *                 example: Civic
 *               year:
 *                 type: integer
 *                 example: 2021
 *               registration_number:
 *                 type: string
 *                 example: GJ02XY9876
 *               color:
 *                 type: string
 *                 example: Black
 *     responses:
 *       200:
 *         description: Vehicle updated successfully
 *       404:
 *         description: Vehicle not found
 */
router.put("/:id", authenticateJWT, authorizeRole("driver"), asyncHandler(VehicleController.updateVehicle));

/**
 * @swagger
 * /api/v1/vehicles/{id}:
 *   delete:
 *     summary: Delete vehicle by ID
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Vehicle ID
 *     responses:
 *       200:
 *         description: Vehicle deleted successfully
 *       404:
 *         description: Vehicle not found
 */
router.delete("/:id", authenticateJWT, authorizeRole("driver"), asyncHandler(VehicleController.deleteVehicle));

export default router;
