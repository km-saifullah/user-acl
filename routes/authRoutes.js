import { Router } from "express";
import { loginUser, userRegister } from "../controllers/authController.js";
import { loginValidator, registerValidator } from "../utils/validator.js";

const router = Router();

router.route("/register").post(registerValidator, userRegister);
router.route("/login").post(loginValidator, loginUser);

export default router;
