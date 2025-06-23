import { Router } from "express";
import {
  createNewUser,
  getAllUsers,
  getUserInfo,
  loginUser,
  logout,
  updateProfile,
  updateStatus,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";
const router = Router();

router.get("/:id", authMiddleware, getUserInfo);

router.post("/register", createNewUser);

router.post("/login", loginUser);

router.put("/update-profile", authMiddleware, updateProfile);

router.post("/logout", logout);

//Admins
router.get("/", adminMiddleware, getAllUsers);
router.put("/update-status/:id", adminMiddleware, updateStatus);
export default router;
