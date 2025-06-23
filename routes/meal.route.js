import { Router } from "express";
import {
  addMeal,
  deleteMeal,
  getMeals,
  updateMeal,
  getSingleMeal,
} from "../controllers/meal.controller.js";
import adminMiddleware from "../middlewares/admin.middleware.js";

const router = Router();

router.post("/", adminMiddleware, addMeal);
router.get("/", getMeals);

router.get("/single-meal/:id", getSingleMeal);
router.put("/:id", adminMiddleware, updateMeal);
router.delete("/:id", adminMiddleware, deleteMeal);
export default router;
