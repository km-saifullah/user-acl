import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
    required: true,
  },
});

const Like = mongoose.model("Like", likeSchema);

export default Like;
