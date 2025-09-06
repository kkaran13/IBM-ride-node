import express from "express";
import PaymentController from "../controllers/payments.contoller.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authorizeRole } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post("/", authenticateJWT, authorizeRole("rider") ,asyncHandler(PaymentController.createPayment));
router.get("/:id", authenticateJWT, authorizeRole("rider") ,asyncHandler(PaymentController.getPaymentById));
router.put("/:id/status", authenticateJWT, authorizeRole("rider") ,asyncHandler(PaymentController.updatePaymentStatus));
router.get("/rider/:rider_id", authenticateJWT, authorizeRole("rider") ,asyncHandler(PaymentController.getPaymentsByRider));

export default router