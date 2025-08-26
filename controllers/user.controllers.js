const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const createToken = (id,email) => {
  return JWT.sign({ id,email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: 'fail', message: 'Email already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      photo: req.file ? req.file.filename : undefined,
    });

    const token = createToken(user._id,user.email);

    res.status(201).json({ status: 'success', token, data: { user } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ status: "fail", message: "Email or password is missing" });
    }

    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not Found" });
    }

    const matchedPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!matchedPassword) {
      return res
        .status(404)
        .json({ status: "fail", message: "Wrong password" });
    }

        const token = createToken(existingUser._id,existingUser.email);

    res.status(200).json({ status: "success", token, data:{user:existingUser} });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};


const protectRoutes = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader)
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ status: 'fail', message: 'Not authorized' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ status: 'fail', message: 'Invalid token' });
  }
};

const starCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ status: 'fail', message: 'User not found' });

    user.staredCourse = user.staredCourse || [];
    user.staredCourse.push(courseId);
    await user.save();

    res.status(200).json({ status: 'success', message: 'Course starred successfully', data:{staredCourse:user.staredCourse} });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

module.exports = {
  signup,
  login,
  protectRoutes,
  starCourse,
};
