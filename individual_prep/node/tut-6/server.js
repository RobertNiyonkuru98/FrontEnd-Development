require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ShortUrl = require("./model/shortUrl.js");

// mongoose.connect(process.env.DATABASE_URL);
// mongoose.connect("mongodb://localhost/urlShortener", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
mongoose.connect(process.env.DATABASE_URL);
//.then(() => console.log("Connected to Database"))
//.catch((err) => console.log("MongoDB Error:", err.message));
//const db = mongoose.connection;
// db.on("error", (error) => console.error(error));
// db.once("open", () => console.log("connected to database"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.render("index.ejs", { shortUrls: shortUrls });
});

app.post("/shortUrls", async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl });
  res.redirect("/");
});

app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.clicks++;
  shortUrl.save();

  res.redirect(shortUrl.full);
});

app.listen(process.env.PORT || 3000);
