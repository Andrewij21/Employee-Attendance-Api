const mongoose = require("mongoose");
const collection = "attendence";
const schema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  time: {
    type: Date,
    default: () => Date.now(),
  },
});
module.exports = mongoose.model(collection, schema);
