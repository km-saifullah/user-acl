import mongoose, { Schema } from "mongoose";

const permissionSchema = new Schema({
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

const Permission = mongoose.model("Permission", permissionSchema);

export default Permission;
