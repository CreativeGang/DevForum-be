const Profile = require('../models/Profile');
const request = require('request');
const User = require('../models/User');
const Post = require('../models/Post')
const getValidationError = require('../utils/getValidationError');

const getAuthProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name']
    );
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const createProfile = async (req, res) => {
  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
  } = req.body;
  //Build profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;
  if (skills) {
    profileFields.skills = skills.split(',').map((skill) => skill.trim());
  }
  //Build social object
  // profileFields.social = {};
  if (youtube) {
    profileFields.social = {};
  } else if (twitter) {
    profileFields.social = {};
  } else if (facebook) {
    profileFields.social = {};
  } else if (linkedin) {
    profileFields.social = {};
  } else if (instagram) {
    profileFields.social = {};
  }
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;
  
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      //Update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }
    //Create
    profile = new Profile(profileFields);
    const error = profile.validateSync();
    if (error) {
      const errorArray = getValidationError(error);
      return res.status(400).json({ msg: { errorArray } });
    }
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getAllProfile = async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name']);
    if (!profile) return res.status(400).json({ msg: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'User Id not valid' });
    }
    res.status(500).send('Server Error');
  }
};

const deleteProfile = async (req, res) => {
  try {
    //@todo - Remove users posts
    await Post.deleteMany({user: req.user.id})
    //Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //Remove user
    // const user = await User.find({ user: req.user.id });
<<<<<<< Updated upstream
    await User.findOneAndRemove({ user: req.user.id });

=======
    // console.log(user)
    await User.findOneAndRemove({  _id: req.user.id });
>>>>>>> Stashed changes
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const addExerience = async (req, res) => {
  const { title, company, location, from, to, current, description } = req.body;
  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  };
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.experience.unshift(newExp);
    const error = profile.validateSync();
    if (error) {
      const errorArray = getValidationError(error);
      return res.status(400).json({ msg: { errorArray } });
    }
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const deleteExperienceById = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //Get remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    // if(removeIndex == -1){
    //   throw "Experience not exstied"
    // }
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const addEducation = async (req, res) => {
  const { school, degree, fieldofstudy, from, to, current, description } =
    req.body;
  const newEdu = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  };
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.education.unshift(newEdu);
    const error = profile.validateSync();
    if (error) {
      const errorArray = getValidationError(error);
      return res.status(400).json({ msg: { errorArray } });
    }
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const deleteEducationById = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //Get remove index
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getGithubRepo = (req, res) => {
  try {
    const option = {
      url: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_SECRET}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };
    request(option, (err, response, body) => {
      if (err) console.error(error);
      if (response.statusCode !== 200) {
        res.status(404).json({ msg: 'No Github Profile Found' });
      }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
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
};
