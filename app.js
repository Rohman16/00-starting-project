const path = require("path");
const myServer = require("express");
const fs = require("fs")
const srv = myServer();

srv.use(myServer.static("frontend-site"));

srv.use((req, res, next) => {
    console.log("Time:", new Date().toISOString());
    next();
});

srv.get("/", function(req, res) {
    const htmlFile = path.join(__dirname, "views", "index.html");
    res.sendFile(htmlFile);
});

srv.get("/about", function(req, res) {
    const htmlFile = path.join(__dirname, "views", "about.html");
    res.sendFile(htmlFile);
});

srv.get("/confirm", function(req, res) {
    const htmlFile = path.join(__dirname, "views", "confirm.html");
    res.sendFile(htmlFile);
});

srv.get("/recommend", function(req, res) {
    const htmlFile = path.join(__dirname, "views", "recommend.html");
    res.sendFile(htmlFile);
});

srv.post("/recommend", function(req, res) {
    const dataBody = req.body;
    const filePath = path.join(__dirname, "data", "restaurant.json")

    const dataRestaurant = fs.readFileSync(filePath)
    const dataRestaurantNew = JSON.parse(dataRestaurant)
    dataRestaurantNew.push(dataBody)

    fs.writeFileSync(filePath, JSON.stringify(dataRestaurantNew))

    res.redirect("/confirm")
})

srv.get("/restaurants", function(req, res) {
    const htmlFile = path.join(__dirname, "views", "restaurants.html");
    res.sendFile(htmlFile);
});
srv.listen(3000);