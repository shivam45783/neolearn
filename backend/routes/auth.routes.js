import {
  getFreshTokens,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  verifyOTP,
} from "../controllers/auth.controller.js";
import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/verify-otp", verifyOTP);
authRouter.get("/getUser", authMiddleware, getUser);
authRouter.get("/refresh", getFreshTokens);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
export default authRouter;
