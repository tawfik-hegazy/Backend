const express = require("express");
const userControllers = require("../controllers/user.controllers");
const multerErrorHandler = require("../middleware/multer.error");
const upload = require("../middleware/upload.multer");

const router = express.Router();

router.post(
  "/register",
  upload.single("photo"),
  multerErrorHandler,
  userControllers.signup
);
router.post("/login", userControllers.login);
router.post(
  "/star-course",
  userControllers.protectRoutes,
  userControllers.starCourse
);

module.exports = router;
