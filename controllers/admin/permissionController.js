import { validationResult } from "express-validator";
import Permission from "../../models/permissionModel.js";

const addPermission = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(200)
        .json({ success: false, msg: "Errors", errors: errors.array() });
    }

    const { permissionName } = req.body;
    const isExists = await Permission.findOne({
      permissionName: {
        $regex: permissionName,
        $options: "i",
      },
    });

    if (isExists) {
      return res
        .status(400)
        .json({ success: false, msg: "permission name already exist" });
    }

    let permissionObj = {
      permissionName: permissionName,
    };

    if (req.body.default) {
      permissionObj.isDefault = parseInt(req.body.default);
    }

    const permission = new Permission(permissionObj);

    const newPermission = await permission.save();

    return res.status(200).json({
      success: true,
      data: newPermission,
      msg: "permission added successfully",
    });
  } catch (error) {
    return res.status(400).json({ success: false, data: error.message });
  }
};

export const getPermission = async (req, res) => {
  try {
    const permissions = await Permission.find({});
    return res.status(200).json({
      success: true,
      data: permissions,
      msg: "permission fetch successfully",
    });
  } catch (error) {
    return res.status(400).json({ success: false, data: error.message });
  }
};

export const deletePermission = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(200)
        .json({ success: false, msg: "Errors", errors: errors.array() });
    }

    const { id } = req.body;
    await Permission.findByIdAndDelete({ _id: id });
    return res.status(200).json({
      success: true,
      data: null,
      msg: "permission deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({ success: false, data: error.message });
  }
};

export const updatePermission = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(200)
        .json({ success: false, msg: "Errors", errors: errors.array() });
    }

    const { id, permissionName } = req.body;
    const isExists = await Permission.findById({ _id: id });

    if (!isExists) {
      return res
        .status(400)
        .json({ success: false, msg: "permission id not exist" });
    }

    const isNameAssigned = await Permission.findOne({
      _id: { $ne: id },
      permissionName: {
        $regex: permissionName,
        $options: "i",
      },
    });

    if (isNameAssigned) {
      return res.status(400).json({
        success: false,
        msg: "permission name already assigned to another permission",
      });
    }

    let updatePermission = {
      permissionName: permissionName,
    };

    if (req.body.default != null) {
      updatePermission.isDefault = parseInt(req.body.default);
    }

    const updatedPermission = await Permission.findByIdAndUpdate(
      { _id: id },
      { $set: updatePermission },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      data: updatedPermission,
      msg: "permission updated successfully",
    });
  } catch (error) {
    return res.status(400).json({ success: false, data: error.message });
  }
};

export default addPermission;
