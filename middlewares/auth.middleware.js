import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from cookies

    const token = req.cookies?.token;
    console.log(token);
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token, authorization denied" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // console.log(decoded);
    // Find user and attach to request object
    req.user = await User.findById(decoded.userId).select("-password");

    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    next(); // Proceed to the next middleware or controller
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authMiddleware;
