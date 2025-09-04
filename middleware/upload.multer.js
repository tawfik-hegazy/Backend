const multer = require("multer");
const path = require("path");
 
const userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/users");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const filename = `user-${Date.now()}.${ext}`;
    cb(null, filename);
  },
});
 
 
const courseStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/courses");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const filename = `course-${Date.now()}.${ext}`;
    cb(null, filename);
  },
});
 
 
const fileFilter = (req, file, cb) => {
  const imageType = file.mimetype.split("/")[0];
  if (imageType === "image") {
    return cb(null, true);
  }
  cb(new Error("Only image files are allowed!"), false);
};
 
const uploadUser = multer({ storage: userStorage, fileFilter });
const uploadCourse = multer({ storage: courseStorage, fileFilter });
 
module.exports = {uploadUser, uploadCourse};
 
 