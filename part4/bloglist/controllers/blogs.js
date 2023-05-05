const blogRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");
const { tokenExtractor, userExtractor } = require("../utils/middleware");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  response.json(blogs);
});

blogRouter.post(
  "/",
  tokenExtractor,

  async (request, response) => {
    const body = request.body;
    const token = request.token;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: request.user._id,
    });

    if (body.title === undefined && body.url === undefined) {
      response.status(400).json({ error: "Title and Url are required" });
    } else {
      const savedBlog = await blog.save();
      user.blogs = user.blogs.concat(savedBlog._id);
      await user.save();
      response.status(201).json(savedBlog);
    }
  }
);

blogRouter.delete("/:id", tokenExtractor, async (request, response) => {
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  console.log("token", token, "decoded token", decodedToken);
  const user = await User.findById(decodedToken.id);
  console.log("user", user);
  if (!user) {
    return response.status(404).json({ error: "authorization failed" });
  }

  const blog = await Blog.findById(request.params.id);
  console.log("blog", blog);
  console.log(
    "user._id",
    user._id.toString(),
    "blog.user",
    blog.user.toString()
  );

  if (!blog) {
    return response.status(404).json({ error: "blog not found" });
  }

  if (user._id.toString() !== blog.user.toString()) {
    return response
      .status(401)
      .json({ error: "unauthorized to delete this blog" });
  } else if (user._id.toString() === blog.user.toString()) {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).send("Blog deleted");
  }
});

blogRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  response.status(204);
});

module.exports = blogRouter;
