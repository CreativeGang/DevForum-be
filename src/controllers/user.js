const User = require('../models/User');
const { generateToken } = require('../utils/jwt');
const path = require('path');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  //todo => validation
  //todo => existing user by username

  const user = new User({ name, password, email });

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

const uploadPhoto = async (req, res) => {
  try {
    const user = await User.updateOne(
      { _id: req.user.id },
      { photo: req.file.filename }
    );
    if (!user) {
      return res.status(404).json({ msg: 'user not found' });
    }
    res.json({
      msg: 'File Uploaded!',
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getUserPhoto = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    // let getPath = path.join(__dirname, `/../uploads/${user.photo}`);

    res.sendFile(
      path.join(__dirname, `/../../uploads/${user.photo}`),
      function (err) {
        if (err) {
          return res.status(400).json({ msg: err.message });
        }
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  createUser,
  getUserById,
  getAllUser,
  uploadPhoto,
  getUserPhoto,
};
