const express = require("express");
const path = require("node:path");
const app = express();
const fs = require("fs");
require("dotenv").config();

const port = process.env.PORT || 3000;
console.log(port);

// to read the quotes file
let quotes = JSON.parse(fs.readFileSync("./quotes.json"));

//prepparing the EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//preparing public directory?
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(express.json());

//middleware to parse data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  // res.send(`${quotes.length}`);
  res.render("index", { quotes });
});
app.get("/api", (req, res) => {
  res.status(200).json({ count: quotes.length, data: { quotes: quotes } });
  // .send("Homepage");
});

app.listen(port, () => {
  console.log(`listening on Port: ${port}`);
});

app.get("*", (req, res) => {
  res.send("Error 404, Page not found");
});

// const postQuote =
app.post("/new", (req, res) => {
  // console.log(req.body);
  const newId = quotes[quotes.length - 1].id + 1;
  console.log(newId);
  // const newQuote = Object.assign({ id: newId }, req.body);
  const newQuote = {
    id: newId,
    quote: req.body.quote,
    author: req.body.author,
  };

  quotes.push(newQuote);

  fs.writeFile("./quotes.json", JSON.stringify(quotes), (err) => {
    res.status(201).json({ status: success, data: { quote: newQuote } });
  });
  res.redirect("/");
});
