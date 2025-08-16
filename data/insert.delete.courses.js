const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Course = require('../models/course.model');
const courses = require('./courses.json');

const insertCourses = async () => {
  try {
    await connectDB();
    await Course.deleteMany(); 
    await Course.insertMany(courses);
    console.log(' Courses inserted successfully');
    process.exit(); 
  } catch (error) {
    console.error(' inserting failed', error.message);
    process.exit(1);
  }
};

insertCourses();
