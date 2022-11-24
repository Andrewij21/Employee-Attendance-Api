require("dotenv").config();
require("./utils/mongoDb");
const express = require("express");
const app = express();
const routes = require("./routes");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);
