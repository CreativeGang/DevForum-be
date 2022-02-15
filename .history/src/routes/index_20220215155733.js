const express = require('express')
const userRouter = require('./user')
const postRouter = require("./post");

const router = express.Router()

router.use('/users', userRouter)

router.use('/posts', postRouter)

module.exports = router