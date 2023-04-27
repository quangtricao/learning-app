const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    author: 1,
    title: 1,
    url: 1,
    likes: 1,
  });

  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, email, password } = request.body;

  const passwordRegex = /^(?=.*[!@#$%^&*.])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
  // At least 6 characters
  // At least 1 Uppercase, 1 Lowercase, 1 Number and 1 special characters (! @ # $ % ^ & * .)

  if (!password) {
    return response.status(400).json({
      error: "invalid password",
    });
  }
  if (!passwordRegex.test(password)) {
    return response.status(400).json({
      error:
        "Password must have at least 6 characters, 1 uppercase, 1 lowercase, 1 number and 1 special characters (! @ # $ % ^ & * .)",
    });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({
      error: "username already exists, please choose another one",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    email,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
