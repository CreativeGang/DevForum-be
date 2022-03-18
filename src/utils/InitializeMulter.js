const multer = require('multer');
const path = require('path');
let count = 0;

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
  destination: `${__dirname}/../uploads/`,
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        '-' +
        Date.now() +
        count +
        path.extname(file.originalname)
    );
  },
});

// Init Upload
module.exports = upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
    count++;
  },
}).single('file');
