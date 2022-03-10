const express = require('express');
const userRouter = require('./user');
const loginRouter = require('./login');
const postRouter = require('./post');
const authRouter = require('./auth');
const profileRouter = require('./profile');
const router = express.Router();

router.use('/users', userRouter);
router.use('/login', loginRouter);
router.use('/post', postRouter);
router.use('/auth', authRouter);
router.use('/profile', profileRouter);

module.exports = router;
