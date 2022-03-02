require('dotenv').config();
const express = require('express');
//try catch every error made by middleware
require('express-async-errors');
const connectDB = require('./utils/db');
const morgan = require('morgan');
const router = require('./routes/index');

const app = express();

const PORT = process.env.PORT || 3000;
connectDB();
//morgan default
app.use(morgan('dev'));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Service is listening !');
});

app.use('/v1', router);

// connectDB();

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
