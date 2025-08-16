const multer = require("multer");
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split("/")[1]; // tp split the 'image/webp' and get the extension
    const fn = `user-${Date.now()}.${extension}`;
    cb(null, fn);
  },
});
const fileFilter = (req, file, cb) => {
  const type = file.mimetype.split("/")[0];
  if (type === "image") {
    return cb(null, true);
  }

  return cb(new Error("only images are allowed "), false);
};

const upload = multer({ storage: diskStorage, fileFilter: fileFilter }); // to insert the image inside the folder so we wrote to storge

module.exports=upload;