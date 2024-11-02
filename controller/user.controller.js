const jwt = require("jsonwebtoken");
const User = require("../models/auth.models");

const generateToken = (id) => {
  return jwt.sign({ id }, "SSHHHH", {
    expiresIn: "30d",
  });
};

const RegisterUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exist" });
    }

    await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: "error register", error });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        success: true,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "email or password invalid!" });
    }
  } catch (error) {
    res.status(400).json({ message: "error login", error });
  }
};

module.exports = { RegisterUser, Login };
