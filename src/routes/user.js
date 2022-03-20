const express = require('express');
const {
  createUser,
  getUserById,
  getAllUser,
  uploadUserPhoto,
} = require('../controllers/User');
const userRouter = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

userRouter.post('', createUser);
userRouter.post('/upload_photo', auth, multer, uploadUserPhoto);
userRouter.get('/get_all_user', getAllUser);
// userRouter.get('/:id', getUserById);

module.exports = userRouter;
