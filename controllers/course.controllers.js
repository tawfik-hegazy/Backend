const Course = require('../models/course.model');
const fs = require("fs");
const path = require("path");  

const createCourse = async (req, res) => {
  try {
    let courseData = { ...req.body };

    if (req.file) {
      courseData.image = req.file.filename;
    }

    const newCourse = await Course.create(courseData);

    res.status(201).json({
      status: 'success',
      data: newCourse,
    });
  } catch (err) {
    if (req.file) {
      fs.unlinkSync(
        path.join(__dirname, "../uploads/courses", req.file.filename)
      );
    }

    res.status(400).json({
      status: "fail",
      message: err.message
    });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({
      status: 'success',
      results: courses.length,
      data: { courses },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        status: 'fail',
        message: 'Course not found',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {course},
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const deletedCourseById = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({
        status: 'fail',
        message: 'Course not found ',
      });
    }
    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const updateCourseById = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!course) {
      return res.status(404).json({
        status: 'fail',
        message: 'Course not found',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {course},
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  deletedCourseById,
  updateCourseById,
};
