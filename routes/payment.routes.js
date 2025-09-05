import express from "express";
import PaymentController from "../controllers/payments.contoller.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const router = express.Router();

router.post("/", authenticateJWT, asyncHandler(PaymentController.createPayment));
router.get("/:id", authenticateJWT, asyncHandler(PaymentController.getPaymentById));
router.put("/:id/status", authenticateJWT, asyncHandler(PaymentController.updatePaymentStatus));
router.get("/rider/:rider_id", authenticateJWT, asyncHandler(PaymentController.getPaymentsByRider));

export default router