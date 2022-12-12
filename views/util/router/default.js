const myExpress = require("express");
const myRouter = myExpress.Router();

myRouter.get("/", function (req, res) {
  res.render("index");
});

myRouter.get("/about", function (req, res) {
  res.render("about");
});

module.exports = myRouter;
