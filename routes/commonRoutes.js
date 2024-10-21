import { Router } from "express";
import { categoryAddValidator } from "../utils/adminValidator.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/categoryController.js";
import { addBlog, getAllBlogs } from "../controllers/blogPostController.js";

const router = Router();

// category routes
router
  .route("/add-categorie")
  .post(verifyToken, categoryAddValidator, addCategory);
router.route("/get-categories").get(verifyToken, getCategories);
router.route("/delete-category").post(verifyToken, deleteCategory);
router.route("/update-category").post(verifyToken, updateCategory);

// blog post
router.route("/create-post").post(verifyToken, addBlog);
router.route("/get-blogposts").get(verifyToken, getAllBlogs);

export default router;
