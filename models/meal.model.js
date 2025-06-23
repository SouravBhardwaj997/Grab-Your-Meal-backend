import { Schema, model } from "mongoose";

const mealSchema = new Schema(
  {
    type: {
      type: String,
      require: true,
    },
    pricePerDay: {
      type: String,
      require: true,
    },
    day1: {
      type: String,
      require: true,
    },
    day2: {
      type: String,
      require: true,
    },
    day3: {
      type: String,
      require: true,
    },
    day4: {
      type: String,
      require: true,
    },
    day5: {
      type: String,
      require: true,
    },
    day6: {
      type: String,
      require: true,
    },
    day7: {
      type: String,
      require: true,
    },
    status: {
      type: Boolean,
      require: true,
      default: true,
    },
  },
  { timestamps: true }
);

const Meal = model("meal", mealSchema);

export default Meal;
