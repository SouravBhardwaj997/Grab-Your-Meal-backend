import { Router } from "express";
import {
  addBooking,
  getUserBookings,
  getAllBookings,
  updateStatusOfBooking,
  updatePaymentStatus,
} from "../controllers/booking.controller.js";
import adminMiddleware from "../middlewares/admin.middleware.js";
const router = Router();

router.get("/", getUserBookings);
router.get("/all-bookings", adminMiddleware, getAllBookings);
router.post("/:id", addBooking);
router.put("/:id", adminMiddleware, updateStatusOfBooking);
router.put("/:bookingId/payment", updatePaymentStatus);

export default router;
