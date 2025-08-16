const express = require('express');
const router = express.Router();
const courseControllers = require('../controllers/course.controllers');

router.route('/')
  .get(courseControllers.getAllCourses)
  .post(courseControllers.createCourse);

router.route('/:id')
  .get(courseControllers.getCourseById)
  .patch(courseControllers.updateCourseById)
  .delete(courseControllers.deletedCourseById);

module.exports = router;
