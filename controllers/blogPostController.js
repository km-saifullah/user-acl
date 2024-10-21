import Blog from "../models/blogPostModel.js";

export const addBlog = async (req, res) => {
  try {
    const { title, description } = req.body;

    var postObj = {
      title,
      description,
    };

    if (req.body.categories) {
      postObj.categories = req.body.categories;
    }

    const post = new Blog(postObj);

    const postData = await post.save();

    const fullPostData = await Blog.findOne({ _id: postData._id }).populate(
      "categories"
    );

    return res
      .status(201)
      .json({ success: true, msg: "blog post added", data: fullPostData });
  } catch (error) {
    return res.status(400).json({ success: false, data: error.message });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const fullPostData = await Blog.find({}).populate("categories");

    return res.status(201).json({
      success: true,
      msg: "blog post fetched successfully",
      data: fullPostData,
    });
  } catch (error) {
    return res.status(400).json({ success: false, data: error.message });
  }
};
