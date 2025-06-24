import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const adminMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Extract token from cookies
    // console.log(req.);
    console.log("token:", req.cookies);
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Find user by ID
    const user = await User.findById(decoded.userId);
    // console.log(user);
    if (!user || user.userRole !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Access denied. Admins only." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export default adminMiddleware;
