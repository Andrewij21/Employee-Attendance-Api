const mongoose = require("mongoose");
const crypto = require("crypto");
const collectionName = "coordinate";
const schema = new mongoose.Schema(
  {
    guid: {
      type: String,
      default: () => crypto.randomBytes(10).toString("hex"),
    },
    lat: {
      type: String,
      require: true,
    },
    long: {
      type: String,
      require: true,
    },
    range: {
      type: String,
    },
    createAt: {
      type: Date,
      default: () => Date.now(),
    },
  },
  {
    collection: collectionName,
  }
);
module.exports = mongoose.model(collectionName, schema);
