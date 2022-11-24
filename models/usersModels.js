const mongoose = require("mongoose");
const crypto = require("crypto");
const schema = new mongoose.Schema({
  userid: {
    type: String,
    default: () => crypto.randomBytes(10).toString("hex"),
  },
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    default: "karyawan",
  },
  verified: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("user", schema);
