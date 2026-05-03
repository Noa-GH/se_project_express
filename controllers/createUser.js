const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;

      res.status(201).send({ data: userWithoutPassword });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return res.status(409).send({ message: "This Email already exists" });
      }
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: "Internal server error" });
    });
};

module.exports = createUser;
