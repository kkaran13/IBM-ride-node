import express from "express";
import UserController from "../controllers/user.controller.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

// Public routes
router.post("/register", asyncHandler(UserController.createUser));
router.post("/login", asyncHandler(UserController.login));

// Protected routes
router.get("/:id", authenticateJWT, asyncHandler(UserController.getUserById));
router.put("/:id", authenticateJWT, asyncHandler(UserController.updateUser));
router.delete("/:id", authenticateJWT, asyncHandler(UserController.deleteUser));

export default router;
