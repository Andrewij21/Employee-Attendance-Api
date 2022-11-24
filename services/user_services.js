const usersModel = require("../models/usersModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretToken = process.env.TOKEN_SECRET;
const { createOtp } = require("../services/otp_services");
const { requestResponse } = require("../utils");
let response;

const login = async ({ email, password }) => {
  const user = await usersModel.findOne({ email });
  if (!user || user.verified == false)
    return (response = {
      ...requestResponse.not_found,
      msg: "User not verify",
    });

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) return (response = { ...requestResponse.unauthorized });

  const token = jwt.sign({ email, password }, secretToken);
  response = {
    ...requestResponse.success,
    data: { id: user.userid, user: user.email, role: user.role, token },
  };
  return response;
};

const create = async ({ username, email, password, role }) => {
  const user = await usersModel.findOne({ email: email });
  if (user)
    return (response = {
      ...requestResponse.unprocessable_entity,
      msg: "Email sudah digunakan",
    });

  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);

  await usersModel.create({
    username,
    email,
    password: hashedPassword,
    role,
  });
  await createOtp({ email });
  return (response = { ...requestResponse.success, username, email });
};
//get all users inculdes admin ,valid, and unvalid
const get = async (page, perpage) => {
  const users = await usersModel
    .find({ verified: true }, { _id: 0, password: 0 })
    .skip((page - 1) * perpage)
    .limit(perpage);
  return users;
};

const getDetail = async ({ userid }) => {
  const user = await usersModel.findOne({ userid });
  if (!user)
    return (response = { ...requestResponse.not_found, msg: "Data not found" });
  return (response = { ...requestResponse.success, user });
};
module.exports = { login, create, get, getDetail };
