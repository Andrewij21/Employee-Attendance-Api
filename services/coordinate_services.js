const coordinateModel = require("../models/coordinate_model");
const { requestResponse } = require("../utils");
let response;

const get = async () => {
  const coordinate = await coordinateModel.find({}, { _id: 0, __v: 0 });
  if (coordinate <= 0)
    return (response = { ...requestResponse.success, msg: "Data is empty" });
  return (response = { ...requestResponse.success, coordinate });
};

const create = async ({ lat, long, range }) => {
  await coordinateModel.deleteMany();
  await coordinateModel.create({ lat, long, range });
  return (response = {
    ...requestResponse.success,
    msg: "Coordinate been add",
  });
};
module.exports = { get, create };
