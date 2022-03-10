const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  //connect users collection
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    required: [true, 'Please enter your status'],
  },
  skills: {
    type: [String],
    required: [true, 'Please enter your sklills'],
  },
  bio: {
    type: String,
  },
  githubusername: {
    type: String,
  },
  experience: [
    {
      title: {
        type: String,
        required: [true, 'Please enter your title'],
      },
      company: {
        type: String,
        required: [true, 'Please enter your company'],
      },
      location: {
        type: String,
      },
      from: {
        type: Date,
        require: [true, 'Please enter your start date'],
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
        required: [true, 'Please enter your school'],
      },
      degree: {
        type: String,
        required: [true, 'Please enter your degree'],
      },
      fieldofstudy: {
        type: String,
        required: [true, 'Please enter your field of study'],
      },
      from: {
        type: Date,
        required: [true, 'Please enter your start date'],
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);
