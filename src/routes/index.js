const express = require('express');
const auth = require('../middleware/auth');
const userRouter = require('./user');
const loginRouter = require('./login');
const postRouter = require('./post');

const router = express.Router();

router.use('/users', userRouter);
router.use('/login', loginRouter);
router.use('/post', auth, postRouter);
module.exports = router;
