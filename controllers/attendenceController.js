const { requestResponse } = require("../utils");
const {
  absen,
  get,
  getToday,
  getDetail,
} = require("../services/attendence_services");
let response;

//selesaiin absen user
const userAttendence = async (req, res) => {
  try {
    const userAbsen = await absen(req.body);
    response = { ...userAbsen };
  } catch (err) {
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};
const monthAttendence = async (req, res) => {
  try {
    const attendence = await get();
    response = { ...attendence };
  } catch (err) {
    response = { ...requestResponse.unprocessable_entity };
  }
  res.status(response.code).json(response);
};
const currentAttendence = async (req, res) => {
  try {
    const attendence = await getToday();
    response = { ...attendence };
  } catch (err) {
    response = { ...requestResponse.unprocessable_entity };
  }
  res.status(response.code).json(response);
};

const detailAttendance = async (req, res) => {
  try {
    const detailUserAttendence = await getDetail(req.params.userid);
    response = { ...detailUserAttendence };
  } catch (err) {
    response = { ...requestResponse.server_error, err };
  }
  res.status(response.code).json(response);
};
module.exports = {
  userAttendence,
  currentAttendence,
  monthAttendence,
  detailAttendance,
};
