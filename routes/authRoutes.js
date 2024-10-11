import { Router } from "express";
import {
  getProfile,
  loginUser,
  userRegister,
} from "../controllers/authController.js";
import { loginValidator, registerValidator } from "../utils/validator.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/register").post(registerValidator, userRegister);
router.route("/login").post(loginValidator, loginUser);

// authenticated route
router.route("/profile").get(verifyToken, getProfile);

export default router;
