import { check } from "express-validator";

export const adminValidator = [
  check("permissionName", "permissionName is required").not().isEmpty(),
];
