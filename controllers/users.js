// eslint-disable-next-line import/no-unresolved
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { JWT_SECRET } = require("../utils/config");
const {
  BAD_REQUEST,
  UNAUTHORIZED,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  CONFLICT_ERROR,
} = require("../utils/errors");

// Post /signin - auth a user and return JWT
module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      console.error(err);
      res.status(UNAUTHORIZED).send({ message: err.message });
    });
};

// Post /signup - create a new user
module.exports.createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) =>
    User.create({ name, avatar, email, password: hash })
      .then((user) => {
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;
        res.status(201).send({ data: userWithoutPassword });
      })
      .catch((err) => {
        console.error(err);
        if (err.code === 11000) {
          return res
            .status(CONFLICT_ERROR)
            .send({ message: "Email already exists" });
        }
        if (err.name === "ValidationError") {
          return res.status(BAD_REQUEST).send({ message: err.message });
        }
        return res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: "An error has occurred on the server." });
      })
  );
};

module.exports.getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "User Not Found" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid user ID" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error occurred the server." });
    });
};
