const route = require("express").Router();
const { users, userDetail } = require("../controllers/userController");
route.get("/", users);
route.post("/profil", userDetail);
module.exports = route;
