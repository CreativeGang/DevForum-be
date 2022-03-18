require('dotenv').config();
const express = require('express');
//try catch every error made by middleware
require('express-async-errors');
const connectDB = require('./utils/db');
const morgan = require('morgan');
const router = require('./routes/index');
const cors = require('cors');
const upload = require('./utils/InitializeMulter');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
connectDB();
//morgan default
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Service is listening !');
});

app.use('/v1', router);

// connectDB();

// Upload Endpoint
app.post('/upload', (req, res) => {
  console.log(upload);
  upload(req, res, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ msg: `There's some problem with the server` });
    } else {
      if (req.file == undefined) {
        return res.status(400).json({ msg: 'No file uploaded' });
      } else {
        res.json({
          msg: 'File Uploaded!',
        });
      }
    }
  });
});
app.get('/download', (req, res) => {
  res.sendFile(`${__dirname}/uploads/cat.jpeg`, function (err) {
    if (err) {
      return res.status(400).json({ msg: err.message });
    }
  });
});

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
