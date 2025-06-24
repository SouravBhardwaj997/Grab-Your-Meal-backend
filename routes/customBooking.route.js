import { Router } from "express";
import {
  addCustomBooking,
  getUserCustomBookings,
  getAllCustomBookings,
  updateStatusOfCustomBooking,
} from "../controllers/customBooking.controller.js";
import adminMiddleware from "../middlewares/admin.middleware.js";
const router = Router();

router.post("/", addCustomBooking);

router.get("/", getUserCustomBookings);
router.get("/all-bookings", getAllCustomBookings);
router.put("/:id", adminMiddleware, updateStatusOfCustomBooking);

export default router;
