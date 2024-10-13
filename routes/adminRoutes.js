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
import { onlyAdminAccess } from "../middlewares/adminMiddleware.js";

const router = Router();

// permission routes
router
  .route("/add-permission")
  .post(verifyToken, onlyAdminAccess, adminValidator, addPermission);
router
  .route("/get-permissions")
  .get(verifyToken, onlyAdminAccess, getPermission);
router
  .route("/delete-permission")
  .post(
    verifyToken,
    onlyAdminAccess,
    permissionDeleteValidator,
    deletePermission
  );
router
  .route("/update-permission")
  .post(
    verifyToken,
    onlyAdminAccess,
    permissionUpdateValidator,
    updatePermission
  );

export default router;
