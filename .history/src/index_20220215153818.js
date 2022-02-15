require("dotenv").config();
const express = require("express");
//将所有middleware 全部用trycatch 包裹
require("express-async-errors");
const morgan = require("morgan");
const errorHandler = require("./middleware/errorHandler");
const validationErrorHandler = require("./middleware/errors/validationErrorHandler");

const router = require("./routes/index");
const connectDB = require("./utils/db");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));

//解析所有json 形式的 req.body, 然后转换成 js obj
// 对所有routes
app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('hello')
// })

app.use("/v1", router);

app.use(validationErrorHandler);
app.use(errorHandler);

connectDB();

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
