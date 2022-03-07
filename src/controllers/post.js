const Post = require('../models/Post');
const User = require('../models/User');
const filterPost = require('../utils/filter');

const { validationResult } = require('express-validator');
const { query } = require('express');

// create a post
const createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = req.user;

    const userData = await User.findById(user.id).select('-password');
    const newPost = new Post({
      text: req.body.text,
      name: userData.name,
      user: user.id,
      category: req.body.category.toLowerCase(),
      tags: req.body.tags.toLowerCase(),
    });
    const post = await newPost.save();
    return res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// get all post
const getPosts = async (req, res) => {
  //filter post by category or sort post by time

  let queryParam = req.query;

  let { filterByCategory, filterByLatest, filterByTag } =
    filterPost(queryParam);
  try {
    const posts = await Post.find(
      Object.keys(filterByCategory).length !== 0
        ? filterByCategory
        : filterByTag
    ).sort(filterByLatest || { text: -1 });
    return res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// get post by id
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    return res.json(post);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// delete post by id
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    // check user
    const { user } = req.user;
    if (post.user.toString() !== user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await post.remove();
    return res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
};

// add like
const addLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // check if the posts hae already been
    const { user } = req.user;
    if (
      post.likes.filter((like) => like.user.toString() === user.id).length > 0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }
    post.likes.unshift({ user: user.id });
    await post.save();
    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// delete like
const deleteLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // check if the posts has already been liked
    const { user } = req.user;
    if (
      post.likes.filter((like) => like.user.toString() === user.id).length === 0
    ) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }
    // get remove index
    const removeIndex = post.likes
      .map((like) => like.id.toString())
      .indexOf(user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();
    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  deletePost,
  addLike,
  deleteLike,
};
