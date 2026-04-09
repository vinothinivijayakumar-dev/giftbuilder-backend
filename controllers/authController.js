const User = require("../models/User");
const bcrypt = require("bcryptjs");

//SIGNUP
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.send("User registered successfully");

  } catch (err) {
    res.status(500).send("Error in signup");
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json("Invalid password");

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });

  } catch (err) {
    res.status(500).json(err);
  }
};