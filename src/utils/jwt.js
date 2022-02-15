const jwt = require("jsonwebtoken");

const { JWT_KEY } = process.env;

//receive payload obj {username}
const generateToken = (payload) => {
  //return access token
  return jwt.sign(payload, JWT_KEY, { expiresIn: "1d" });
};

const validateToken = (token) => {
  try {
    //成功verify, 返回decoded payload
    return jwt.verify(token, JWT_KEY);
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  validateToken,
};
