import { Router } from "express";
import {
  adminValidator,
  permissionDeleteValidator,
  permissionUpdateValidator,
} from "../utils/adminValidator.js";
import addPermission, {
  deletePermission,
  getPermission,
  updatePermission,
} from "../controllers/admin/permissionController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

// permission routes
router
  .route("/add-permission")
  .post(verifyToken, adminValidator, addPermission);
router.route("/get-permissions").get(verifyToken, getPermission);
router
  .route("/delete-permission")
  .post(verifyToken, permissionDeleteValidator, deletePermission);
router
  .route("/update-permission")
  .post(verifyToken, permissionUpdateValidator, updatePermission);

export default router;
