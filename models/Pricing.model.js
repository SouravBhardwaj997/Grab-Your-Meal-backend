import { Schema, model } from "mongoose";

const pricingSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    duration: {
      type: String,
      require: true,
    },
    price: {
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

const Pricing = model("pricing", pricingSchema);

export default Pricing;
