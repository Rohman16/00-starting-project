const myExpress = require("express");
const uuid = require("uuid");
const myRouter = myExpress.Router();
const {
  getRestaurantDt,
  writeRestaurantData,
} = require("../getDataRestaurant");

myRouter.get("/confirm", function (req, res) {
  res.render("confirm");
});

myRouter.get("/recommend", function (req, res) {
  res.render("recommend");
});

myRouter.post("/recommend", function (req, res) {
  const dataBody = req.body;
  dataBody.id = uuid.v4();
  const myRestaurant = getRestaurantDt();
  console.log(myRestaurant);
  myRestaurant.push(dataBody);

  writeRestaurantData(myRestaurant);

  res.redirect("/confirm");
});

myRouter.get("/restaurants", function (req, res) {
  const dataRestaurantNew = getRestaurantDt();
  dataRestaurantNew.sort(function (resA, resB) {
    if (resA.name > resB.name) {
      return 1;
    }
    return -1;
  });
  res.render("restaurants", {
    numberRestaurant: dataRestaurantNew.length,
    allRestaurant: dataRestaurantNew,
  });
});

myRouter.get("/restaurants/:id", function (req, res) {
  const restId = req.params.id;

  const dataRestaurantNew = getRestaurantDt();
  for (const myRest of dataRestaurantNew) {
    if (myRest.id === restId)
      return res.render("rest-details", { rest: myRest });
  }
  res.status(404).render("404");
});

module.exports = myRouter;
