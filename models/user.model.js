const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

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
        return validator.isEmail(value);
      },
      message: "You must entered a valid email",
    },
    index: {
      unique: true,
    },
    lowercase: true,
  },
  password: {
    type: String,
    minlength: 4,
    maxlength: 12,
    required: [true, "Password is required"],
    trim: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Incorrect email or password"));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Incorrect email or password"));
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
