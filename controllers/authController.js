import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

// generate accessToken
const generateAccessToken = async (user) => {
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "2h",
  });
  return token;
};

const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(200)
        .json({ success: false, msg: "Errors", errors: errors.array() });
    }

    const userFound = await User.findOne({ email });
    if (userFound) {
      return res
        .status(200)
        .json({ success: false, msg: "Email already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    const userData = await user.save();
    return res
      .status(200)
      .json({ success: true, msg: "registration successful", data: userData });
  } catch (error) {
    return res.status(400).json({ success: false, msg: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(200)
        .json({ success: false, msg: "Errors", errors: errors.array() });
    }

    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res
        .status(400)
        .json({ success: false, msg: "email and password not found" });
    }

    const checkPassword = await bcrypt.compare(password, userFound.password);

    if (!checkPassword) {
      return res
        .status(400)
        .json({ success: false, msg: "email and password incorrect" });
    }

    const accessToken = await generateAccessToken({ user: userFound });

    return res.status(200).json({
      success: true,
      msg: "login successful",
      data: userFound,
      token: accessToken,
      tokenType: "Bearer",
    });
  } catch (error) {
    return res.status(400).json({ success: false, msg: error.message });
  }
};

export { userRegister, loginUser };
