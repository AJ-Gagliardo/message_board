const express = require("express");
const app = express();

const port = 3000;

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.listen(port, () => {
  console.log(`listening on Port: ${port}`);
});

app.get("*", (req, res) => {
  res.send("Error 404, Page not found");
});

app.post("/", (req, res) => {
  console.log("this will send a post request");
});
