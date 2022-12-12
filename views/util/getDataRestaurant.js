const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../../", "data", "restaurant.json");

function getRestaurantDt() {
  const dataRestaurant = fs.readFileSync(filePath);
  const dataRestaurantNew = JSON.parse(dataRestaurant);
  return dataRestaurantNew;
}

function writeRestaurantData(rest) {
  fs.writeFileSync(filePath, JSON.stringify(rest));
}
const myDir = path.join(__dirname, "../../", "data", "restaurant.json");
console.log(filePath);

// getRestaurantDt();
module.exports = { getRestaurantDt, writeRestaurantData };
