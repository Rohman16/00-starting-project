const path = require("path");
const myServer = require("express");

const srv = myServer();

srv.use(myServer.static("frontend-site"));

srv.use((req, res, next) => {
  console.log("Time:", new Date().toISOString());
  next();
});

srv.get("/", function (req, res) {
  const htmlFile = path.join(__dirname, "views", "index.html");
  res.sendFile(htmlFile);
});

srv.get("/about", function (req, res) {
  const htmlFile = path.join(__dirname, "views", "about.html");
  res.sendFile(htmlFile);
});

srv.get("/confirm", function (req, res) {
  const htmlFile = path.join(__dirname, "views", "confirm.html");
  res.sendFile(htmlFile);
});

srv.get("/recommend", function (req, res) {
  const htmlFile = path.join(__dirname, "views", "recommend.html");
  res.sendFile(htmlFile);
});

srv.get("/restaurants", function (req, res) {
  const htmlFile = path.join(__dirname, "views", "restaurants.html");
  res.sendFile(htmlFile);
});
srv.listen(3000);
