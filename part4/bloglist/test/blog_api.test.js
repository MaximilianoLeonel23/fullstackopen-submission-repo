const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const initialBlog = [
  {
    title: "How to improve your soft skills in a year",
    author: "Lissandra Campbell",
    url: "www.lissandracampbell.com/blog/54",
    likes: 34511,
    id: "644bce99575166b58495b899",
  },
  {
    title: "First steps on biotechnology",
    author: "Melissa Martin",
    url: "www.melibiotech.com/first-steps-on-biotechnology",
    likes: 15200,
    id: "644bda9399af2315d0855eb0",
  },
];

// npm test test/blog_api.test.js

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlog[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlog[1]);
  await blogObject.save();
});

describe("testing blog api", () => {
  test("all blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 100000);

  test("there are two blogs", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(initialBlog.length);
  }, 100000);

  test("the first blog is about soft skills", async () => {
    const response = await api.get("/api/blogs");

    const titles = response.body.map((blog) => blog.title);
    expect(titles).toContain("How to improve your soft skills in a year");
  }, 100000);

  test("the blog have property id and not _id", async () => {
    const response = await api.get("/api/blogs");

    const testBlog = response.body[0];
    expect(testBlog.id).toBeDefined();
    expect(testBlog._id).toBeUndefined();
  }, 100000);

  test("adding new blog", async () => {
    const newBlog = {
      title: "Best practices in Node.js",
      author: "Mathew Green",
      url: "www.learnnodejs.com/blogs",
      likes: 400,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");

    const titles = response.body.map((blog) => blog.title);
    expect(response.body).toHaveLength(initialBlog.length + 1);
    expect(titles).toContain("Best practices in Node.js");
  });

  test("a blog without likes will have 0 likes", async () => {
    const newBlogWithoutLikes = {
      title: "Best practices in Node.js",
      author: "Mathew Green",
      url: "www.learnnodejs.com/blogs",
    };

    await api.post("/api/blogs").send(newBlogWithoutLikes).expect(201);

    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(initialBlog.length + 1);
    expect(response.body[2].likes).toBe(0);
  }, 100000);

  test("a blog without title and url return error 400", async () => {
    const newBlogWithoutTitleAndUrl = {
      author: "Mariana Carreras",
      likes: 5416696,
    };

    const resp = await api
      .post("/api/blogs")
      .send(newBlogWithoutTitleAndUrl)
      .expect(400);

    expect(resp.body.error).toBeDefined();

    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(initialBlog.length);
  }, 100000);

  afterAll(() => {
    mongoose.connection.close();
  });
});
