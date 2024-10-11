import { Router } from "express";
import { adminValidator } from "../utils/adminValidator.js";
import addPermission from "../controllers/admin/permissionController.js";

const router = Router();

router.route("/add-permission").post(adminValidator, addPermission);

export default router;
