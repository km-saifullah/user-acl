import { Router } from "express";
import { categoryAddValidator } from "../utils/adminValidator.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/categoryController.js";

const router = Router();

// category routes
router
  .route("/add-categorie")
  .post(verifyToken, categoryAddValidator, addCategory);
router.route("/get-categories").get(verifyToken, getCategories);
router.route("/delete-category").post(verifyToken, deleteCategory);
router.route("/update-category").post(verifyToken, updateCategory);

export default router;
