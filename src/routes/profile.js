const express = require('express');
const profileRouter = express.Router();
const auth = require('../middleware/auth');
const {
  getAuthProfile,
  createProfile,
  getAllProfile,
  getProfileById,
  deleteProfile,
  addExerience,
  deleteExperienceById,
  addEducation,
  deleteEducationById,
  getGithubRepo,
} = require('../controllers/profile');

//@route GET v1/profile/me
//@desc Get current users' profile Test route
//@access Private
profileRouter.get('/me', auth, getAuthProfile);

//@route POST v1/profile/
//@desc Create or update user profile
//@access Private
profileRouter.post('/', auth, createProfile);

//@route Get v1/profile/
//@desc Get all profiles
//@access Public
profileRouter.get('/', getAllProfile);

//@route Get v1/profile/user/:user_id
//@desc Get profile by user ID
//@access Public
profileRouter.get('/user/:user_id', getProfileById);


//@route DELETE v1/profile/
//@desc DELETE profile, user & posts
//@access Private
profileRouter.delete('/', auth, deleteProfile);

//@route PUT v1/profile/experience
//@desc add profile experience
//@access Private
profileRouter.put('/experience', auth, addExerience);

//@route DELETE v1/profile/experience/:exp_id
//@desc Delete experience from profile
//@access Private
profileRouter.delete('/experience/:exp_id', auth, deleteExperienceById);

//@route PUT v1/profile/education
//@desc add profile education
//@access Private
profileRouter.put('/education', auth, addEducation);

//@route DELETE v1/profile/education/:exp_id
//@desc Delete education from profile
//@access Private
profileRouter.delete('/education/:edu_id', auth, deleteEducationById);

//@route GET v1/profile/github/:username
//@desc GET user repos from Github
//@access Public
profileRouter.get('/github/:username', getGithubRepo);

module.exports = profileRouter;
