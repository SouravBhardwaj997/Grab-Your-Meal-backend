import CustomBooking from "../models/customBooking.model.js";

const addCustomBooking = async (req, res) => {
  try {
    const { id: customer } = req.user;
    const {
      breakfastCount,
      lunchCount,
      dinnerCount,
      daysCount,
      startDate,
      endDate,
      finalPrice,
    } = req.body;
    if (
      !breakfastCount ||
      !lunchCount ||
      !dinnerCount ||
      !daysCount ||
      !startDate ||
      !endDate ||
      !finalPrice
    ) {
      return res
        .status(400)
        .send({ success: false, message: "All Fields are required" });
    }

    const addedBooking = await CustomBooking.create({
      breakfastCount,
      lunchCount,
      dinnerCount,
      startDate,
      endDate,
      daysCount,
      finalPrice,
      customer,
    });
    return res
      .status(200)
      .json({ success: true, message: "Booking Added", addedBooking });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getUserCustomBookings = async (req, res) => {
  try {
    const bookings = await CustomBooking.find({
      customer: req.user._id,
    }).populate("customer");
    return res
      .status(200)
      .json({ success: true, message: "Booking fetched", bookings });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getAllCustomBookings = async (req, res) => {
  try {
    const { status } = req.query; // Extract query parameters

    // Build filter object dynamically
    let filter = {};
    if (status) {
      filter.status = status; // Apply filter only if status is provided
    }

    const bookings = await CustomBooking.find(filter).populate("customer");
    return res
      .status(200)
      .json({ success: true, message: "Booking fetched", bookings });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const updateStatusOfCustomBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const udpatedBooking = await CustomBooking.findByIdAndUpdate(id, {
      status,
    });
    return res
      .status(200)
      .json({ success: true, message: "Status udpdated", udpatedBooking });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export {
  addCustomBooking,
  getAllCustomBookings,
  getUserCustomBookings,
  updateStatusOfCustomBooking,
};
