import moment from "moment";
import Booking from "../models/booking.model.js";
import Pricing from "../models/Pricing.model.js";
import User from "../models/user.model.js";
const calculateEndDate = (startDate, duration) => {
  const [num, unit] = duration.split(" "); // Split duration like "2 weeks"

  return moment(startDate).add(parseInt(num), unit).format("YYYY-MM-DD"); // Format output
};

//Booking is being added but we have to provide date in format of YYYY-MM-DD from frontend
const addBooking = async (req, res) => {
  try {
    const { id: pricing } = req.params;
    const { id: customer } = req.user;
    const { startDate } = req.body;

    if (!startDate) {
      return res
        .status(400)
        .send({ success: false, message: "Start Date is not provided" });
    }

    const pricingDetails = await Pricing.findById(pricing);
    if (!pricingDetails) {
      return res
        .status(404)
        .json({ success: false, message: "Pricing plan not found" });
    }

    const { duration } = pricingDetails;
    const endDate = calculateEndDate(startDate, duration);

    const booking = await Booking.create({
      customer,
      pricing,
      startDate,
      endDate,
      status: "Pending", // Initial status is pending until payment is confirmed
      paymentStatus: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Booking created",
      booking,
      amount: pricingDetails.price,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Add a new method to update payment status
const updatePaymentStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { paymentStatus } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        paymentStatus,
        status: paymentStatus === "Completed" ? "Approved" : "Pending",
      },
      { new: true }
    );

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Payment status updated", booking });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

//working good with postman
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: req.user._id })
      .populate("customer")
      .populate("pricing");
    return res
      .status(200)
      .json({ success: true, message: "Booking fetched", bookings });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

//working good with postman
const getAllBookings = async (req, res) => {
  try {
    const { status } = req.query; // Extract query parameters

    // Build filter object dynamically
    let filter = {};
    if (status) {
      filter.status = status; // Apply filter only if status is provided
    }

    const bookings = await Booking.find(filter)
      .populate("customer")
      .populate("pricing");

    return res
      .status(200)
      .json({ success: true, message: "Bookings fetched", bookings });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const updateStatusOfBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const udpatedBooking = await Booking.findByIdAndUpdate(id, { status });
    return res
      .status(200)
      .json({ success: true, message: "Status udpdated", udpatedBooking });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export {
  addBooking,
  getUserBookings,
  getAllBookings,
  updateStatusOfBooking,
  updatePaymentStatus,
};
