import Pricing from "../models/Pricing.model.js";

//working right in postman
const addPricing = async (req, res) => {
  try {
    const { name, description, duration, price } = req.body;
    console.log(name, description, duration, price);
    if (!name || !description || !duration || !price) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const newPricing = await Pricing.create({
      name,
      description,
      duration,
      price,
    });

    return res.status(201).json({
      success: true,
      message: "Pricing created successfully",
      newPricing,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

//working right in postman
const getPricings = async (req, res) => {
  try {
    const pricings = await Pricing.find({});
    return res.status(200).json({ success: true, pricings });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

//working right in postman
const updatePricing = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, duration, price } = req.body;

    const updatedPricing = await Pricing.findByIdAndUpdate(
      id,
      { name, description, duration, price },
      { new: true }
    );

    if (!updatedPricing) {
      return res
        .status(404)
        .json({ success: false, message: "Pricing not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Pricing updated successfully",
      updatedPricing,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

//working right in postman
const deletePricing = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the pricing entry
    const deletedPricing = await Pricing.findByIdAndDelete(id);

    // If pricing entry is not found
    if (!deletedPricing) {
      return res
        .status(404)
        .json({ success: false, message: "Pricing not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Pricing deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getSinglePricing = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const pricing = await Pricing.findById(id);
    if (!pricing) {
      return res
        .status(400)
        .json({ success: false, message: "Pricing Not Found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Pricing Found", pricing });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export {
  addPricing,
  getPricings,
  updatePricing,
  deletePricing,
  getSinglePricing,
};
