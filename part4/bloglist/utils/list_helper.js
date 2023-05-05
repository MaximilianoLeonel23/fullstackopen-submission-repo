const lodash = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (!blogs) {
    return;
  } else if (blogs.length === 0) {
    return 0;
  } else {
    const likes = blogs.reduce((acc, curr) => {
      return acc + curr.likes;
    }, 0);
    return likes;
  }
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  let favorite = blogs[0];
  blogs.forEach((blog) => {
    blog.likes > favorite.likes ? (favorite = blog) : favorite;
  });
  return favorite;
};

const mostBlogs = (blogs) => {
  const blogsByAuthor = lodash.groupBy(blogs, "author");

  let mostBlogsAuthor = null;
  for (let author in blogsByAuthor) {
    if (
      !mostBlogsAuthor ||
      blogsByAuthor[author].length > blogsByAuthor[mostBlogsAuthor].length
    ) {
      mostBlogsAuthor = author;
    }
  }
  return {
    author: mostBlogsAuthor,
    blogs: blogsByAuthor[mostBlogsAuthor].length,
  };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
