const express = require("express");
const app = express();
const fs = require("fs");

const port = 3000;
let quotes = JSON.parse(fs.readFileSync("./quotes.json"));

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`${quotes.length}`);
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

app.post("/api", (req, res) => {
  // console.log(req.body);
  const newId = quotes[quotes.length - 1].id + 1;
  console.log(newId);
  const newQuote = Object.assign({ id: newId }, req.body);
  quotes.push(newQuote);

  fs.writeFile("./quotes.json", JSON.stringify(quotes), (err) => {
    res.status(201).json({ status: success, data: { movie: newMovie } });
  });
  res.send("creating a post");
});
