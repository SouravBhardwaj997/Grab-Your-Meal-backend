import { Router } from "express";
import {
  addPricing,
  deletePricing,
  getPricings,
  updatePricing,
  getSinglePricing,
} from "../controllers/pricing.controller.js";
import adminMiddleware from "../middlewares/admin.middleware.js";
const router = Router();

router.get("/", getPricings);

router.post("/", adminMiddleware, addPricing);

router.put("/:id", adminMiddleware, updatePricing);

router.delete("/:id", adminMiddleware, deletePricing);

router.get("/single-pricing/:id", getSinglePricing);

export default router;
