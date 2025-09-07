import express from "express";
import PaymentController from "../controllers/payments.contoller.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authorizeRole } from "../middlewares/role.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment management for rides, including creation, status updates, and retrieval by rider
 */

/**
 * @swagger
 * /api/v1/payments:
 *   post:
 *     summary: Create a new payment (Rider only)
 *     tags: [Payments]
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
 *               amount:
 *                 type: number
 *                 example: 250.75
 *               method:
 *                 type: string
 *                 enum: [cash, card, upi, wallet]
 *                 example: card
 *               paymentId:
 *                 type: string
 *                 example: "txn_123456789"
 *     responses:
 *       201:
 *         description: Payment created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", authenticateJWT, authorizeRole("rider"), asyncHandler(PaymentController.createPayment));

/**
 * @swagger
 * /api/v1/payments/{id}:
 *   get:
 *     summary: Get payment by ID (Rider only)
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment ID (MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: Payment details
 *       404:
 *         description: Payment not found
 */
router.get("/:id", authenticateJWT, authorizeRole("rider"), asyncHandler(PaymentController.getPaymentById));

/**
 * @swagger
 * /api/v1/payments/{id}/status:
 *   put:
 *     summary: Update payment status (Rider only)
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment ID (MongoDB ObjectId)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, success, failed, refunded]
 *                 example: success
 *     responses:
 *       200:
 *         description: Payment status updated
 *       404:
 *         description: Payment not found
 */
router.put("/:id/status", authenticateJWT, authorizeRole("rider"), asyncHandler(PaymentController.updatePaymentStatus));

/**
 * @swagger
 * /api/v1/payments/rider/{rider_id}:
 *   get:
 *     summary: Get all payments by rider (Rider only)
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rider_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Rider ID (MySQL rider_id)
 *     responses:
 *       200:
 *         description: List of payments for the rider
 *       404:
 *         description: No payments found
 */
router.get("/rider/:rider_id", authenticateJWT, authorizeRole("rider"), asyncHandler(PaymentController.getPaymentsByRider));

export default router;
