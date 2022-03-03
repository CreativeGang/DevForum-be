const User = require('../models/User')

const loadAuthUser =  async (req, res) => {
  try {
    console.log(req.user.id)
    const user = await User.findById(req.user.id).select('-password');
    console.log(user)
    res.json(user)
  } catch(err) {
      console.log(err.message)
      res.status(500).send('Server Error')
  }
  // res.send('Auth route')
}

module.exports = {
  loadAuthUser
};