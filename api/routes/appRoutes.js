//Routes serving html files for client side of app
const express = require("express");
const appRoutes = express.Router();
const controller = require("../controllers/appControllers");

appRoutes.get("/", controller.index); //serves resident sign in page

module.exports = appRoutes;
