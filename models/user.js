const mongoose = require('mongoose');
const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: [true, 'Please provide an email address'],
    unique: true,
  },

  password: {
    type: String,
    required: [true, 'password cannot be empty'],
    trim: true,
  },

  api_key: {
    type: String,
    required: [true, 'api-key exists'],
    unique: true,
  },
});

module.exports = model('User', userSchema);
