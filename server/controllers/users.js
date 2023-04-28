const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: "Unauthorized. Token missing or invalid" });
  }

  const users = await User.find({}).populate("courses", {
    title: 1,
    status: 1,
  });

  response.json(users);
});

// Register a new account
usersRouter.post("/", async (request, response) => {
  const { username, email, password } = request.body;

  const passwordRegex = /^(?=.*[!@#$%^&*.])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
  // At least 6 characters
  // At least 1 Uppercase, 1 Lowercase, 1 Number and 1 special characters (! @ # $ % ^ & * .)

  if (!password) {
    return response.status(400).json({
      error: "Missing password. Please provide one",
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
      error: "Username already exists, please choose another one",
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
