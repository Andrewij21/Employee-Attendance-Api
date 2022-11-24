const { requestResponse } = require("../utils");
const { get, create } = require("../services/coordinate_services");
let response;

const getCoordinate = async (req, res) => {
  try {
    const coordinate = await get();
    response = { ...coordinate };
  } catch (err) {
    response = { ...requestResponse.server_error, err: err.toString() };
  }
  res.status(response.code).json(response);
};
const createCoordinate = async (req, res) => {
  try {
    const coordinate = await create(req.body);
    response = { ...coordinate };
  } catch (err) {
    response = { ...requestResponse.server_error, err: err.toString() };
  }
  res.status(response.code).json(response);
};
module.exports = { getCoordinate, createCoordinate };
