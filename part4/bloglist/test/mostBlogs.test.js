const helper = require("../utils/list_helper");

describe("the most blogs author", () => {
  const blogs = [
    { title: "El arte de la programación", author: "John Doe", likes: 10 },
    {
      title: "Cómo cocinar una cena romántica",
      author: "Alice Smith",
      likes: 20,
    },
    { title: "Aprende a dibujar en 5 días", author: "Bob Johnson", likes: 5 },
    { title: "El camino del emprendimiento", author: "John Doe", likes: 15 },
    { title: "Los secretos del SEO", author: "Emma Jones", likes: 8 },
    {
      title: "Cocina japonesa para principiantes",
      author: "Alice Smith",
      likes: 30,
    },
    {
      title: "Consejos para el cuidado de la piel",
      author: "Sophie Brown",
      likes: 12,
    },
    {
      title: "Cómo aprender un nuevo idioma en un mes",
      author: "Bob Johnson",
      likes: 7,
    },
    {
      title: "Introducción a la física cuántica",
      author: "John Doe",
      likes: 25,
    },
    {
      title: "La historia del arte en 100 obras maestras",
      author: "Emma Jones",
      likes: 18,
    },
    {
      title: "Cómo organizar tu espacio de trabajo",
      author: "Alice Smith",
      likes: 22,
    },
    { title: "Programando con Python", author: "Sophie Brown", likes: 9 },
    {
      title: "El poder del pensamiento positivo",
      author: "Bob Johnson",
      likes: 13,
    },
    {
      title: "Aprende a tocar guitarra en 30 días",
      author: "John Doe",
      likes: 17,
    },
    { title: "Los secretos de la meditación", author: "Emma Jones", likes: 11 },
  ];

  helper.mostLikes(blogs);

  test("of a blogs list", () => {
    const result = helper.mostBlogs(blogs);

    expect(result).toStrictEqual({ author: "John Doe", blogs: 4 });
  });
});
