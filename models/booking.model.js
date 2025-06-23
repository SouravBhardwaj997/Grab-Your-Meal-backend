import mongoose, { Schema, model } from "mongoose";
import User from "./user.model.js";
import Pricing from "./Pricing.model.js";
const bookingSchema = new Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    pricing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "pricing",
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "Approved", // Since we only create after payment
    },
    paymentId: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Bookings = model("booking", bookingSchema);

export default Bookings;
