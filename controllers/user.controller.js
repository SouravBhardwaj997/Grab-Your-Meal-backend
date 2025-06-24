import User from "../models/user.model.js";
import { generateToken } from "../services/auth.service.js";

const getUserInfo = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).select("-password");
  if (!user) {
    return res.status(400).json({ success: false, message: "No user Found" });
  }
  return res.status(200).json({ success: true, message: "User found", user });
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    return res
      .status(200)
      .json({ success: true, message: "Users Fetched", users });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const createNewUser = async (req, res) => {
  try {
    const { name, email, password, address, contact } = req.body;

    // Validate required fields
    if (!name || !email || !address || !contact || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password should be at least 6 characters long",
      });
    }
    if (!(contact.length == 10)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Contact",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Create and save new user
    const user = new User({
      name,
      email,
      password,
      address,
      contact,
    });
    await user.save();

    // Generate authentication token
    const token = await generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true, //  can't access from frontend JS
      secure: true, // must be true for HTTPS
      sameSite: "None",
    });
    // Return response
    return res.status(201).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        contact: user.contact,
        address: user.address,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .send({ success: false, message: "All fields are required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).send({
        success: false,
        message: "Incorrect email or password",
      });
    const isPasswordCorrect = await user.comparePasswords(password);

    if (!isPasswordCorrect)
      return res.status(400).send({
        success: false,
        message: "Incorrect email or password",
      });

    const token = await generateToken(user._id);

    // Return response
    res.cookie("token", token, {
      httpOnly: true, // ✅ can't access from frontend JS
      secure: true, // ✅ must be true for HTTPS
      sameSite: "None",
    });
    return res.status(201).json({
      success: true,

      user: {
        id: user._id,
        name: user.name,
        contact: user.contact,
        address: user.address,
        email: user.email,
        role: user.userRole,
        status: user.status,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: "Server Error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from the token
    const { name, email, contact, address, password } = req.body;

    // Find user by ID
    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Update fields if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (contact) user.contact = contact;
    if (address) user.address = address;

    // If password is provided, hash it before updating
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: "Password should be at least 6 characters long",
        });
      }
    }

    // Save updated user
    await user.save();

    // Return updated details (excluding password)
    res.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
        address: user.address,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true, // ✅ can't access from frontend JS
    secure: true, // ✅ must be true for HTTPS
    sameSite: "None",

    expires: new Date(0), // Expire the cookie
  });

  res.json({ success: true, message: "Logged out successfully" });
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const udpatedUser = await User.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, message: "User Updated", udpatedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export {
  createNewUser,
  loginUser,
  updateProfile,
  logout,
  getUserInfo,
  updateStatus,
  getAllUsers,
};
