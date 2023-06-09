const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const result = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
  });

  response.json(result);
});

usersRouter.post("/", async (request, response) => {
  const body = request.body;

  if (!body.username || !body.password) {
    response.status(400).json({ error: "user or password is missing" });
  } else if (body.username.length < 3 || body.password.length < 3) {
    response.status(400).json({ error: "user or password is too short" });
  } else {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    });

    const savedUser = await user.save();

    response.json(savedUser);
  }
});

module.exports = usersRouter;
