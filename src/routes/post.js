const express = require('express');
const postRouter = express.Router();
const auth = require('../middleware/auth');

const {
  // post,
  createPost,
  getPosts,
  getPostById,
  deletePost,
  addLike,
  deleteLike,
} = require('../controllers/post');

// postRouter.post('', post);
postRouter.get('/', getPosts);
postRouter.post('/create_post', auth, createPost);
postRouter.get('/:id', getPostById);
postRouter.delete('/:id', auth, deletePost);
postRouter.put('/like/:id', addLike);
postRouter.put('/unlike/:id', deleteLike);

module.exports = postRouter;
