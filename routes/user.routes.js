import express from "express";
import { healthCheck } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/:id", healthCheck);

export default router;
