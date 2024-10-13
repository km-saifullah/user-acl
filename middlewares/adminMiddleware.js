export const onlyAdminAccess = async (req, res, next) => {
  try {
    if (req.user.role != 1) {
      return res
        .status(200)
        .json({ success: false, msg: "you have not access this route" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, msg: "something went wrong" });
  }
  next();
};
