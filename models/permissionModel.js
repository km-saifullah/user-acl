import mongoose, { Schema } from "mongoose";

const permissionSchema = new Schema({
  permissionName: {
    type: String,
    required: true,
  },
  isDefault: {
    type: Number,
    default: 0, // 0 -> not default 1 -> default
  },
});

const Permission = mongoose.model("Permission", permissionSchema);

export default Permission;
