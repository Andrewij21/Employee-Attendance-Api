const route = require("express").Router();
const {
  getCoordinate,
  createCoordinate,
} = require("../controllers/coordinateController");
route.get("/", getCoordinate);
route.post("/", createCoordinate);
module.exports = route;
