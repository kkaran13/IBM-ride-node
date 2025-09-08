// routes/rating.routes.js
import { Router } from "express";
import RatingController from "../controllers/rating.controller.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authorizeRole } from "../middlewares/role.middleware.js";

const router = Router();

// router.use(authenticateJWT);

router.post("/", authenticateJWT  ,authorizeRole("rider"), asyncHandler(RatingController.createRating));
router.get("/:id",authenticateJWT , authorizeRole("rider") , asyncHandler(RatingController.getRatingById));
router.get("/ride/:ride_id",authenticateJWT ,authorizeRole("rider"), asyncHandler(RatingController.getRatingsByRide));
router.put("/:id",authenticateJWT , authorizeRole("rider"),  asyncHandler(RatingController.updateRating));

export default router;
