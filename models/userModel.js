import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 0, // 0->user, 1->admin 2->subAdmin, 3->editor
  },
});

const User = mongoose.model("User", userSchema);

export default User;
