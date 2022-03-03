const express = require('express');
const authRouter = express.Router();
const auth = require('../middleware/auth');
const { loadAuthUser } = require('../controllers/auth');

authRouter.get('/', auth, loadAuthUser);
module.exports = authRouter;
