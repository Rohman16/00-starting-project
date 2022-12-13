const path = require("path");
const myServer = require("express");
const fs = require("fs");
const srv = myServer();
const uuid = require("uuid");
const {
    getRestaurantDt,
    writeRestaurantData,
} = require("./views/util/getDataRestaurant");

const theRouter = require("./views/util/router/default");
const theRouterForList = require("./views/util/router/rest-list");

// const restData = require("./views/util/getDataRestaurant");
srv.set("views", path.join(__dirname, "views"));
srv.set("view engine", "ejs");

srv.use(myServer.urlencoded({ extended: false }));
srv.use(myServer.static("frontend-site"));

srv.use((req, res, next) => {
    console.log("Time:", new Date().toLocaleString());
    next();
});

srv.use("/", theRouter);
srv.use("/", theRouterForList);

srv.use(function(req, res) {
    res.status(404).render("404");
});

srv.use(function(error, req, res, next) {
    res.status(500).render("500");
});

srv.listen(3000);