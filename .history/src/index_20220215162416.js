require("dotenv").config();
const express = require("express");
//将所有middleware 全部用trycatch 包裹
require("express-async-errors");
const morgan = require("morgan");
const router = require('./routes/index')

const app = express();

const PORT = process.env.PORT || 3000;

//morgan default
app.use(morgan("dev"));

app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('hello')
// })

app.use("/v1", router);

// connectDB();

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
