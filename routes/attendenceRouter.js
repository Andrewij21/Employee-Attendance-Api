const route = require("express").Router();
const {
  userAttendence,
  currentAttendence,
  monthAttendence,
  detailAttendance,
} = require("../controllers/attendenceController");
route.post("/", userAttendence);
route.get("/", currentAttendence);
route.get("/this-month", monthAttendence);
route.post("/user/:userid", detailAttendance);
module.exports = route;
