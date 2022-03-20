const mongoose = require('mongoose');
const joi = require('joi');
//hash bcrypt
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 4,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (email) => {
        return !joi.string().email().validate(email).error;
      },
      msg: 'Invalid email message',
    },
  },
  posts: [
    {
      type: String,
      ref: 'Post',
    },
  ],
  photo: {
    type: String,
  },
  occupation: {
    type: String,
  },
});

UserSchema.methods.hashPassword = async function () {
  //hash original password to => salt (generated after 12 rounds)
  this.password = await bcrypt.hash(this.password, 12);
};

//
UserSchema.methods.validatePassword = async function (password) {
  //return true, false or error
  return bcrypt.compare(password, this.password);
};

//collection => users
const Model = mongoose.model('User', UserSchema);

module.exports = mongoose.models.User || Model;
