const jwt = require("jsonwebtoken");
let commonFuntion = require('../common_function');

const authMiddleware = async (req, res, next) => {
  const loginPath = "/api/admin/login/authenticate";

  if (loginPath.includes(req.url)) {
    return next();
  }
  const { token } = req.cookies;
  if (token === "" || token === null || token === undefined) {
    return res.status(502).json({
      status: false,
      status_code: "INVALID_TOKEN",
      message: "Invalid token"
    });
  }

  const token_data = await commonFuntion.verifyToken(token);
  if (!token_data.token_info) {
    res.status(token_data.err.name === 'TokenExpiredError' ? 401 : 502);
    return res.json({
      status: false,
      status_code: "TOKEN_EXPIRED",
      message: "Token has expired! Please Login again!"
    });
  } else {
    req.user = token_data.token_info;
    next();
  }
};

module.exports = authMiddleware;
