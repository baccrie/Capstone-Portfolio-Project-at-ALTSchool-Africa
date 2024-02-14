const mongoose = require("mongoose");
const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      require: [true, "username field cannot be empty"],
      trim: true,
      minLength: 5,
      maxLength: 20,
    },

    email: {
      type: String,
      require: [true, "Please provide an email address"],
      unique: true,
    },

    password: {
      type: String,
      require: [true, "password cannot be empty"],
      trim: true,
      minLength: 5,
      maxLength: 20,
    },

    apiKey: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
