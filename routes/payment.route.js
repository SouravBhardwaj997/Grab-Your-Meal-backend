import { Router } from "express";
import {
  initiatePayment,
  verifyPayment,
} from "../controllers/payment.controller.js";

const router = Router();

router.post("/initiate", initiatePayment);
router.post("/verify", verifyPayment);

export default router;
