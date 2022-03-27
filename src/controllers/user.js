const User = require('../models/User');
const { generateToken } = require('../utils/jwt');
const path = require('path');

const { uploadFile } = require('../utils/amazonS3');
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);
const gravatar = require('gravatar');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const photo = gravatar.url(email, {
    s: '200',
    r: 'pg',
    d: 'mm',
  });
  //todo => validation
  //todo => existing user by username
  const user = new User({ name, password, email, photo });

  //validate user input
  if (user.validateSync())
    return res.status(400).json({ msg: 'Validation Error.' });

  //Check if the user already exists
  let userExist = await User.findOne({ email });

  if (userExist) {
    return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
  }

  //hash user document's password with method defined in user model
  await user.hashPassword();

  await user.save();

  //have access to private route after registration
  const payload = {
    user: {
      id: user.id,
    },
  };
  const token = generateToken(payload);

  res.json({ name, token });
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ msg: 'user not found' });
  }

  res.json(user);
};

const getAllUser = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

const uploadUserPhoto = async (req, res) => {
  try {
    const file = req.file;
    const result = await uploadFile(file);
    let imagePath = result.Location;
    const user = await User.findByIdAndUpdate(req.user.id, {
      photo: imagePath,
    });
    if (!user) {
      return res.status(404).json({ msg: 'Error:user not found' });
    }
    await unlinkFile(file.path);
    res.json({
      imagePath,
      msg: 'Photo Uploaded',
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = {
  createUser,
  getUserById,
  getAllUser,
  uploadUserPhoto,
};
