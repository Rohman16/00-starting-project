const path = require("path");
const myServer = require("express");
const fs = require("fs");
const srv = myServer();

srv.set("views", path.join(__dirname, "views"));
srv.set("view engine", "ejs");

srv.use(myServer.urlencoded({ extended: false }));
srv.use(myServer.static("frontend-site"));

srv.use((req, res, next) => {
  console.log("Time:", new Date().toISOString());
  next();
});

srv.get("/", function (req, res) {
  res.render("index");
});

srv.get("/about", function (req, res) {
  res.render("about");
});

srv.get("/confirm", function (req, res) {
  res.render("confirm");
});

srv.get("/recommend", function (req, res) {
  res.render("recommend");
});

srv.post("/recommend", function (req, res) {
  const dataBody = req.body;
  const filePath = path.join(__dirname, "data", "restaurant.json");

  const dataRestaurant = fs.readFileSync(filePath);
  const dataRestaurantNew = JSON.parse(dataRestaurant);
  dataRestaurantNew.push(dataBody);

  fs.writeFileSync(filePath, JSON.stringify(dataRestaurantNew));

  res.redirect("/confirm");
});

srv.get("/restaurants", function (req, res) {
  const filePath = path.join(__dirname, "data", "restaurant.json");

  const dataRestaurant = fs.readFileSync(filePath);
  const dataRestaurantNew = JSON.parse(dataRestaurant);
  res.render("restaurants", { numberRestaurant: dataRestaurantNew.length });
});
srv.listen(3000);
