import { validationResult } from "express-validator";
import Category from "../models/categoryModel.js";

export const addCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(200)
        .json({ success: false, msg: "Errors", errors: errors.array() });
    }

    const { categoryName } = req.body;

    const isCategoiryExist = await Category.findOne({
      categoryName: { $regex: categoryName, $options: "i" },
    });

    if (isCategoiryExist) {
      return res.status(400).json({
        success: false,
        msg: "category name already exist",
      });
    }

    const category = new Category({
      categoryName,
    });

    const categoryData = await category.save();
    return res
      .status(200)
      .json({ success: true, msg: "category created", data: categoryData });
  } catch (error) {
    return res.status(400).json({ success: false, data: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const category = await Category.find({});

    return res.status(200).json({
      success: true,
      msg: "category fetched successfully",
      data: category,
    });
  } catch (error) {
    return res.status(400).json({ success: false, data: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.body;
    const categoryData = await Category.findOne({ _id: id });
    if (!categoryData) {
      return res
        .status(400)
        .json({ success: false, message: "category ID doesn't exist" });
    }
    await Category.findByIdAndDelete({ _id: id });
    return res.status(200).json({
      success: true,
      msg: "category deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({ success: false, data: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id, categoryName } = req.body;
    const categoryData = await Category.findOne({ _id: id });
    if (!categoryData) {
      return res
        .status(400)
        .json({ success: false, message: "category ID doesn't exist" });
    }

    const isCategoiryExist = await Category.findOne({
      _id: {
        $ne: id,
      },
      categoryName: { $regex: categoryName, $options: "i" },
    });

    if (isCategoiryExist) {
      return res.status(400).json({
        success: false,
        msg: "category name already exist in another category",
      });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          categoryName: categoryName,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      msg: "category updated successfully",
      date: updatedCategory,
    });
  } catch (error) {
    return res.status(400).json({ success: false, data: error.message });
  }
};
