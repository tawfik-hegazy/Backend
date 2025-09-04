const express = require('express');
const router = express.Router();
const courseControllers = require('../controllers/course.controllers');
const { uploadCourse } = require('../middleware/upload.multer');

router.route('/')
  .get(courseControllers.getAllCourses)
  .post(uploadCourse.single('image'),courseControllers.createCourse);

router.route('/:id')
  .get(courseControllers.getCourseById)
  .patch(courseControllers.updateCourseById)
  .delete(courseControllers.deletedCourseById);

module.exports = router;
