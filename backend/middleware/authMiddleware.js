import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const accessToken = authHeader.split(" ")[1];

  if (!accessToken) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    if (!req.body) {
      req.body = {};
    }
    req.body.userId = decoded.id;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(402).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
