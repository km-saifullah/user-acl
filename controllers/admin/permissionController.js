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
    const isExists = await Permission.findOne({ permissionName });

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

    return res
      .status(400)
      .json({
        success: true,
        data: newPermission,
        msg: "permission added successfully",
      });
  } catch (error) {
    return res.status(400).json({ success: false, data: error.message });
  }
};

export default addPermission;
