import express from "express";
import User from "../models/user.model";

const userRouter = express.Router();

// this route is for trial only
userRouter.get("/", (req, res) => {
  res.json({
    msg: "trial for the user route",
  });
});

// this route help in creating new user
// only when username is unique
userRouter.post("/add", async (req, res) => {
  const username = req.body.username;

  const existingUser = await User.findOne({
    username: username,
  });

  if (existingUser)
    res.json({
      msg: `user with this username: ${username} already exists`,
    });

  const newUser = await User.create({
    username: username,
  });

  await newUser.save();

  res.json({
    msg: `user with this username: ${username} has been created`,
  });
});

// this route help in getting all the users
userRouter.get("/users", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

export default userRouter;
