// eslint-disable-next-line import/no-unresolved
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

// Controller to create a new user
async function createUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the user
    const user = new User({ email, password: hashedPassword });
    await user.save();

    return res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating user.", error: error.message });
  }
}

module.exports = createUser;
