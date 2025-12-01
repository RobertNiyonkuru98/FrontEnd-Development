const express = require("express");
const app = express();
const mongoose = require("mongoose");
const articleRouter = require("./routes/articles.js");

app.set("view engine", "ejs");

app.use("/articles", articleRouter);

app.get("/", (req, res) => {
  const articles = [
    {
      title: "Test Article",
      createdAt: new Date(),
      description: "Test Description",
    },
    {
      title: "Test Article 2",
      createdAt: new Date(),
      description: "Test Description 2",
    },
  ];
  res.render("articles/index.ejs", { articles: articles });
});
app.listen(process.env.PORT || 3000);
