import Meal from "../models/meal.model.js";

//Working Right in Postman
const addMeal = async (req, res) => {
  try {
    const { day1, day2, day3, day4, day5, day6, day7, type, pricePerDay } =
      req.body;
    if (
      !type ||
      !day1 ||
      !day2 ||
      !day3 ||
      !day4 ||
      !day5 ||
      !day6 ||
      !day7 ||
      !type ||
      !pricePerDay
    ) {
      return res
        .status(400)
        .send({ success: false, message: "All fields are required" });
    }

    const existingMeal = await Meal.findOne({ type });
    if (existingMeal) {
      return res
        .status(400)
        .json({ success: false, message: "Meal already exists" });
    }

    const meal = await Meal.create({
      day1,
      day2,
      day3,
      day4,
      day5,
      day6,
      day7,
      pricePerDay,
      type,
    });

    return res
      .status(201)
      .json({ success: true, message: "Meal Added successfully", meal });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

//Working Right in Postman
const getMeals = async (req, res) => {
  try {
    const { type } = req.query;
    let filter = {};
    if (type) {
      filter.type = type;
    }

    const meals = await Meal.find(filter);
    return res.status(200).json({ success: true, meals });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

//Working Right in Postman
const updateMeal = async (req, res) => {
  try {
    const { id } = req.params;
    const { day1, day2, day3, day4, day5, day6, day7, type, pricePerDay } =
      req.body;

    const updatedMeal = await Meal.findByIdAndUpdate(
      id,
      {
        day1,
        day2,
        day3,
        day4,
        day5,
        day6,
        day7,
        pricePerDay,
        type,
      },
      { new: true }
    );
    if (!updatedMeal) {
      return res
        .status(404)
        .json({ success: false, message: "Meal not found" });
    }
    return res.status(200).json({ success: true, updatedMeal });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

//Working Right in Postman
const deleteMeal = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMeal = await Meal.findByIdAndDelete(id);
    if (!deletedMeal) {
      return res
        .status(404)
        .json({ success: false, message: "Meal not found" });
    }
    return res.status(200).json({ success: true, message: "Meal Deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getSingleMeal = async (req, res) => {
  try {
    const { id } = req.params;
    const meal = await Meal.findById(id);
    if (!meal) {
      return res
        .status(400)
        .json({ success: false, message: "Meal Not Found" });
    }
    return res.status(200).json({ success: true, message: "Meal Found", meal });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
export { addMeal, getMeals, updateMeal, deleteMeal, getSingleMeal };
