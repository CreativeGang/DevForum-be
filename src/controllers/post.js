const Post = require('../models/Post');
const User = require('../models/user');

const { validationResult } = require("express-validator");


// const post = async (req, res) => {
//   const { user } = req.user;
//   res.send(`user_id:${user.id} autehticate successfully`);
// };

// create a post
const createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const { user } = req.user;
    console.log(user.id)
    const userData = await User.findById(user.id).select('-password');
    console.log(userData)
    const newPost = new Post({
      text: req.body.text,
      name: userData.name,
      user: user.id
    })
    const post = await newPost.save();
    res.json(post)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
}


// get all post
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
}

// get post by id
const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    console.error(err.message);
    res.status(500).send('Server Error')
  }
}

// delete post by id
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' })
    }
    // check user
    const { user } = req.user;
    console.log(user.id)
    // const userData = await User.findById(user.id).select('-password');
    if (post.user.toString() !== user.id) {
      console.log(user.id)
      return res.status(401).json({ msg: 'User not authorized' })
    }
    await post.remove()
    res.json({ msg: 'Post removed' })
  } catch (err) {
    console.error(err.message)
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' })
    }
    res.status(500).send('Server Error')
  }
}

// add like
const addLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // console.log(post.like)
    // check if the posts hae already been 
    const { user } = req.user;
    console.log("======", user.id)
    const userData = await User.findById(user.id).select('-password');
    console.log(userData)
    console.log(userData.id.toString(), user.id)
    console.log(post.likes,'likes')
    if (
      // userData._id.toString() === user.id
      post.likes.filter(like => like.user.toString() === user.id ).length > 0
    ) {
      return res.status(400).json({ msg: 'Post already liked' })
    }
    post.likes.unshift({ user: user.id })
    await post.save()
    res.json(post.likes);
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

// delete like
const deleteLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log(post)
    // check if the posts has already been liked
    const { user } = req.user
    if (
      post.likes.filter(like => like.user.toString() === user.id).length === 0
    ) {
      return res.status(400).json({ msg: 'Post has not yet been liked' })
    }
    // get remove index
    const removeIndex = post.likes.map(like => like.id.toString()).indexOf(user.id)
    post.likes.splice(removeIndex, 1)
    await post.save()
    res.json(post.likes);
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

module.exports = {
  // post,
  createPost,
  getAllPosts,
  getPost,
  deletePost,
  addLike,
  deleteLike
};