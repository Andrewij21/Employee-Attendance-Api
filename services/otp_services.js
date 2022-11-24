const bcrypt = require("bcrypt");
const otpModel = require("../models/otpModels");
const { sendMail } = require("./mail_services");
const { requestResponse } = require("../utils");
const usersModel = require("../models/usersModels");
let response;
const genrateOTP = async (length) => {
  return Math.floor(
    Math.pow(10, length - 1) +
      Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1))
  );
};
//matikan sementara
const createOtp = async ({ email }) => {
  console.log(email);
  const otp = await genrateOTP(6);
  const salt = 10;
  const hashOtp = await bcrypt.hash(otp.toString(), salt);
  //masukkan data ke model otp
  // await sendMail({ to: email, otp: otp.toString() });
  
  await otpModel.create({ email, otp: hashOtp.toString() });
  response = {
    ...requestResponse.success,
    msg: `OTP has been send to ${email}`,
  };
  return response;
};

const resend = async (data) => {
  const { email } = data;
  //cek user sudah di valid apa belum baru lanjut
  await otpModel.deleteMany({ email });
  createOtp(data);
  response = { ...requestResponse.success, msg: "Success resend OTP" };
  return response;
};

const find = async ({ email, otp }) => {
  const userOtp = await otpModel.findOne({ email });
  if (!userOtp)
    return (response = {
      ...requestResponse.unprocessable_entity,
      msg: "OTP Is expired or not found",
    });
  const isValid = await bcrypt.compare(otp, userOtp.otp);
  if (!isValid)
    return (response = {
      ...requestResponse.unprocessable_entity,
      msg: "Invalid OTP code ",
    });
  await usersModel.updateOne({ email }, { verified: true });
  await otpModel.deleteMany({ email });
  response = { ...requestResponse.success, msg: "User has been validated" };
  return response;
};
module.exports = { createOtp, find, resend };
