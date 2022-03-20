const multer = require('multer');
const path = require('path');

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

const storage = multer.diskStorage({
  destination: `${__dirname}/../../uploads/`,
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Init Upload
upload = multer({
  storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single('file');

module.exports = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ msg: `There's some problem with the server` });
    } else {
      if (req.file == undefined) {
        return res.status(400).json({ msg: 'No file uploaded' });
      } else {
        return next();
      }
    }
  });
};
