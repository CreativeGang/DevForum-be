const User = require('../models/User');

const loadAuthUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
  // res.send('Auth route')
};

module.exports = {
  loadAuthUser,
};
