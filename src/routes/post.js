const express = require('express');
const postRouter = express.Router();
const post = require('../controllers/post');

postRouter.post('', post);
module.exports = postRouter;
