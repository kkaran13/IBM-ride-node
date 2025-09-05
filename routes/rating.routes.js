// routes/rating.routes.js
import { Router } from "express";
import RatingController from "../controllers/rating.controller.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const router = Router();

router.use(authenticateJWT); // protect all routes

router.post("/", asyncHandler(RatingController.createRating));
router.get("/:id", asyncHandler(RatingController.getRatingById));
router.get("/ride/:ride_id", asyncHandler(RatingController.getRatingsByRide));
router.put("/:id", asyncHandler(RatingController.updateRating));

export default router;
