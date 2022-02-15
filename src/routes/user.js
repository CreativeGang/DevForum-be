const express = require("express");
const { createUser, getUserById } = require("../controllers/user");

const userRouter = express.Router();

userRouter.post("", createUser);
userRouter.get("/:id", getUserById);

module.exports = userRouter;
