require("dotenv").config();
const express = require("express");
const { send } = require("express/lib/response");
//将所有middleware 全部用trycatch 包裹
require("express-async-errors");
const morgan = require("morgan");
//
const app = express();

const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
