import jwt from "jsonwebtoken";

const config = process.env.JWT_SECRECT_KEY;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]?.split(" ");
  if (req.headers["authorization"]) {
    try {
      if (authHeader[0] !== "Bearer") {
        return res.status(403).json({ message: "Token Required" });
      } else {
        jwt.verify(authHeader[1], config, (err) => {
          return next();
        });
      }
    } catch (e) {
      return res.status(401).json({ message: "Employee not authorized" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }
};

export default verifyToken;