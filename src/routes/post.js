const express = require('express');
const postRouter = express.Router();

const {
  // post, 
  createPost,
  getAllPosts,
  getPost,
  deletePost,
  addLike,
  deleteLike, 
  } = require('../controllers/post');

// postRouter.post('', post);
postRouter.post('', createPost);
postRouter.get('/', getAllPosts);
postRouter.get('/:id', getPost);
postRouter.delete('/:id', deletePost);
postRouter.put('/like/:id', addLike);
postRouter.put('/unlike/:id', deleteLike);

module.exports = postRouter;