const multer = require('multer');

const multerErrorHndler = (error, req, res, next) => {
  if (error instanceof multer.MulterError || error.message === 'only images are allowed') {
    return res.status(400).json({ status: 'fail', message: error.message });
  }
  next();
};

module.exports = multerErrorHndler;
