import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categories: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: false,
    },
  ],
});

const Blog = mongoose.model("Blog", postSchema);

export default Blog;
