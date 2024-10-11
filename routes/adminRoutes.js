import { Router } from "express";
import { adminValidator } from "../utils/adminValidator.js";
import addPermission from "../controllers/admin/permissionController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

router
  .route("/add-permission")
  .post(verifyToken, adminValidator, addPermission);

export default router;
