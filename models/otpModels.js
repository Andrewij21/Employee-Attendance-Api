//bikin model otp
const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  email: {
    type: String,
  },
  otp: {
    type: String,
  },
  createdAt: {
    type: Date,
    expires: 5 * 60,
    default: Date.now(),
  },
});
module.exports = mongoose.model("otp", schema);
