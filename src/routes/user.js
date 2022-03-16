const express = require('express');
const { createUser, getUserById, getAllUser } = require('../controllers/user');
const userRouter = express.Router();

userRouter.post('', createUser);
userRouter.get('/get_all_user', getAllUser);
userRouter.get('/:id', getUserById);

module.exports = userRouter;
