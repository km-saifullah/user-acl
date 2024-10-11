import mongoose, { Schema } from "mongoose";

const userPermissionSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  permissions: [
    {
      permissionName: String,
      permissionValue: [Number],
    },
  ],
});

const UserPermission = mongoose.model("UserPermission", userPermissionSchema);

export default UserPermission;
