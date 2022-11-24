const { requestResponse } = require("../utils");
const { find, resend } = require("../services/otp_services");
const { login, create } = require("../services/user_services");

let response;
const createUser = async (req, res) => {
  try {
    const user = await create(req.body);
    response = { ...user };
  } catch (err) {
    response = { ...requestResponse.server_error, e: err };
  }
  res.status(response.code).json(response);
};

const loginUser = async (req, res) => {
  try {
    const user = await login(req.body);
    response = { ...user };
  } catch (err) {
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};

//buat satu lagi logina admin
const loginAdmin = async (req, res) => {
  try {
    const admin = await login(req.body);
    if (!admin.data || admin.data.role == "karyawan") {
      response = {
        ...requestResponse.unauthorized,
        msg: "User unauthorized test",
      };
      return res.status(response.code).json(response);
    }
    response = { ...admin };
  } catch (err) {
    response = { ...requestResponse.server_error, err: err.toString() };
  }
  res.status(response.code).json(response);
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const userVerify = await find({ email, otp });
    response = { ...userVerify };
  } catch (err) {
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};

const resendOtp = async (req, res) => {
  try {
    const otp = await resend(req.body);
    response = { ...otp };
  } catch (err) {
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};

module.exports = { createUser, loginUser, verifyOtp, loginAdmin, resendOtp };
