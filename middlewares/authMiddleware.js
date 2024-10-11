import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    const token =
      req.body.token ||
      req.query.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        msg: "a token is required for authentication",
      });
    }

    const decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decodedData.user;
  } catch (error) {
    return res.status(400).json({ success: false, msg: "invalid token" });
  }

  return next();
};
