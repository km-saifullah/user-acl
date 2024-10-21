import { check } from "express-validator";

export const adminValidator = [
  check("permissionName", "permissionName is required").not().isEmpty(),
];

export const permissionDeleteValidator = [
  check("id", "id is required").not().isEmpty(),
];

export const permissionUpdateValidator = [
  check("id", "id is required").not().isEmpty(),
  check("permissionName", "permissionName is required").not().isEmpty(),
];

export const categoryAddValidator = [
  check("categoryName", "categoryName is required").not().isEmpty(),
];
