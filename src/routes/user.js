const express = require('express');
const {
  createUser,
  getUserById,
  getAllUser,
  uploadPhoto,
  getUserPhoto,
} = require('../controllers/User');
const userRouter = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

userRouter.post('', createUser);
userRouter.get('/get_all_user', getAllUser);
// userRouter.get('/:id', getUserById);

//@route Post v1/users/upload_user_photo
//@desc upload User photo
//@access Private
userRouter.post('/upload_photo', auth, multer, uploadPhoto);

//@route get v1/users/get_user_photo
//@desc get User photo
//@access Private
userRouter.get('/get_user_photo', auth, getUserPhoto);

module.exports = userRouter;
