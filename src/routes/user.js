const express = require('express');
const { createUser, getUserById } = require('../controllers/user');
const userRouter = express.Router();
const auth = require('../middleware/auth');

userRouter.post('', createUser);
userRouter.get('/:id', getUserById);

module.exports = userRouter;
