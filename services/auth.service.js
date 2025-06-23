import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";

export const generateToken = async (userId) => {
  const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
  return token;
};
