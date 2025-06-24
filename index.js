import express from "express";
import dotenv from "dotenv/config";
import connectToDB from "./config/db.js";
import cors from "cors";
//importing middlewares
import cookieParser from "cookie-parser";
import adminMiddleware from "./middlewares/admin.middleware.js";
import authMiddleware from "./middlewares/auth.middleware.js";
//importing routes
import userRoute from "./routes/user.route.js";
import mealRoute from "./routes/meal.route.js";
import pricingRoute from "./routes/pricing.route.js";
import bookingRoute from "./routes/booking.route.js";
import customeBookingRoute from "./routes/customBooking.route.js";
import paymentRoute from "./routes/payment.route.js";
const app = express();
const PORT = process.env.PORT;

//middlewares
app.use(express.json());
//chnaged cors
app.use(
  cors({
    origin: "https://grab-your-meal.vercel.app/",
    credentials: true,
  })
);
app.use(cookieParser());

//routes
app.use("/api/user", userRoute); //Successfully working in postman
app.use("/api/booking", authMiddleware, bookingRoute);
app.use("/api/custom-booking", authMiddleware, customeBookingRoute);
app.use("/api/payment", authMiddleware, paymentRoute);

//routes -> Admin
app.use("/api/admin/meals", mealRoute); //Successfully Workin gin Postman
app.use("/api/admin/pricing", pricingRoute); //Successfully working in postman

app.listen(PORT, () => {
  connectToDB();
  console.log("Server is running at", PORT);
});
