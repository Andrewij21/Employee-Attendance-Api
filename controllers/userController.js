const { requestResponse } = require("../utils");
const { get, getDetail } = require("../services/user_services");
let response;

//selesaiin absen user
const users = async (req, res) => {
  try {
    const page = req.query.p || 1;
    const perPage = 2;
    const allUsers = await get(page, perPage);
    response = { ...allUsers };
  } catch (err) {
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};

const userDetail = async (req, res) => {
  try {
    const user = await getDetail(req.body);
    response = { ...user };
  } catch (err) {
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};

module.exports = { users, userDetail };
