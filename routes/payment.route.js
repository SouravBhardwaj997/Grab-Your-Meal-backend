import { Router } from "express";
import { initiatePayment, verifyPayment } from "../controllers/payment.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/initiate", authMiddleware, initiatePayment);
router.post("/verify", authMiddleware, verifyPayment);

export default router;