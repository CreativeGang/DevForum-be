const mongoose = require('mongoose');
const joi = require('joi');
//hash bcrypt
const bcrypt = require('bcrypt');

const schema = mongoose.Schema({
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
});

schema.methods.hashPassword = async function () {
  //hash original password to => salt (generated after 12 rounds)
  this.password = await bcrypt.hash(this.password, 12);
};

//
schema.methods.validatePassword = async function (password) {
  //return true, false or error
  return bcrypt.compare(password, this.password);
};

//collection => users
const Model = mongoose.model('User', schema);

module.exports = Model;
