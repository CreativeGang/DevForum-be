const Mongoose = require("mongoose");
const connectDB = () => {
  const connectionString = process.env.CONNECTION_STRING;

  if (!connectionString) {
    console.error("connection string not defined");
    //退出当前程序, 非正常退出
    process.exit(1);
    //正常退出
    // process.exit(0) //除了0以外的其他数字都表示非正常退出
  }

  const db = mongoose.connection;

  //connectionString 在 production 里面不要打印
  db.on("connected", () => {
    console.log(`DB connected, ${connectionString}`);
  });

  db.on("error", () => {
    console.error(error.message);
    process.exit(2);
  });

  db.on("disconnected", () => {
    console.log("db connection lost");
  });

  //连接本地数据库
  //return promise
  return mongoose.connect(connectionString);
};

module.exports = connectDB;
