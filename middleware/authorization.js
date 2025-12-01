const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      res.status(401).json({
        message: "bearer token not found",
      });
    }

    const token = bearerToken.split(" ");

    if (token[0] !== "Bearer") {
      return res.status(401).json({
        message: "Bearer token is required",
      });
    }

    if (!token[1]) {
      res.status(404).json({
        message: "Token not found",
      });
    }

    const decode = jwt.verify(token[1], process.env.SECRET_KEY);

    if (decode.role !== "admin") {
      res.status(403).json({
        message: "you are not admin",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = authorization;
