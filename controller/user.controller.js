const jwt = require("jsonwebtoken");
const User = require("../models/auth.models");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "SSHHHH", {
    expiresIn: "30d",
  });
};

const RegisterUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("request received", name, email);
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
  console.log("request received", email, password);
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

const GetUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        profession: user.profession,
        bio: user.bio,
        location: user.location,
        followers: user.followers,
        following: user.following,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user profile", error: error.message });
  }
};

const UpdateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { name, email, image, profession, bio, location, followers, following } = req.body;

    // Update user fields if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (image) user.image = image;
    if (profession) user.profession = profession;
    if (bio) user.bio = bio;
    if (location) user.location = location;
    if (followers !== undefined) user.followers = followers;
    if (following !== undefined) user.following = following;

    const updatedUser = await user.save();

    res.json({
      success: true,
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        image: updatedUser.image,
        profession: updatedUser.profession,
        bio: updatedUser.bio,
        location: updatedUser.location,
        followers: updatedUser.followers,
        following: updatedUser.following,
        isAdmin: updatedUser.isAdmin,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user profile", error: error.message });
  }
};

const DeleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(req.user._id);

    res.json({
      success: true,
      message: "User profile deleted successfully"
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user profile", error: error.message });
  }
};

module.exports = { RegisterUser, Login, GetUser, UpdateUser, DeleteUser };
