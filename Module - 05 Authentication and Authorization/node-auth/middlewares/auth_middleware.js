import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  try {
    // Taking token from cookies
    const token = req.cookies?.accessToken;

    if (!token)
      return res.status(401).json({
        success: false,
        message: "JWT token is missing or invalid.",
      });

    // Verify token if exists
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Unauthorized: Token has expired" });
    }
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};
