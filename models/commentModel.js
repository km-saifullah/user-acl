import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
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
  comment: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
