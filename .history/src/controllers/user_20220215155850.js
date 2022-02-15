const User = require("../models/user");
const { generateToken } = require("../utils/jwt");

const createUser = async (req, res) => {
  const { username, password } = req.body;

  //todo => validation
  //todo => existing user by username

  const user = new User({ username, password });

  //hash user document's password with method defined in user model
  await user.hashPassword();

  await user.save();

  //新用户注册后就可以直接浏览private route
  const token = generateToken({ username });

  return res.json({ username, token });
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(404).json({ msg: "user not found" });
  }

  res.json(user);
};

module.exports = {
  createUser,
  getUserById,
};
