// middlewares/verifyToken.js (CommonJS)
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_in_prod";

function verifyToken(req, res, next) {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];
  if (!authHeader)
    return res
      .status(401)
      .json({ success: false, message: "No Authorization header" });

  // authHeader should be "Bearer <token>"
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res
      .status(401)
      .json({ success: false, message: "Invalid Authorization format" });
  }

  const token = parts[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err)
      return res
        .status(403)
        .json({ success: false, message: "Invalid or expired token" });
    req.user = decoded; // decoded payload (e.g. { username, iat, exp })
    next();
  });
}

module.exports = verifyToken;
