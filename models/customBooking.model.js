import mongoose, { Schema, model } from "mongoose";

const customBookingSchema = new Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    breakfastCount: {
      type: String,
      required: true,
    },
    lunchCount: {
      type: String,
      required: true,
    },
    dinnerCount: {
      type: String,
      required: true,
    },
    dayCount: {
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
    finalPrice: {
      type: String,
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
  },
  { timestamps: true }
);

const CustomBookings = model("customBooking", customBookingSchema);

export default CustomBookings;
