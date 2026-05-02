const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: [true, "Name is required"],
    trim: true,
  },
  avatar: {
    type: String,
    required: [true, "Avatar URL is required"],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter valid URL",
    },
  },
  email: {
    type: String,
    required: [true, "A valid Email is required"],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter valid URL",
    },
    index: {
      unique: true,
      sparse: true,
    },
    lowercase: true,
  },
  password: {
    type: String,
    minlength: 4,
    maxlength: 12,
    required: [true, "Password is required"],
    trim: true,
  },
});

module.exports = mongoose.model("user", userSchema);
