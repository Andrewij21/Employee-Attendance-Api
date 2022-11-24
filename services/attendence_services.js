const attendenceModel = require("../models/attendanceModels");
const userModel = require("../models/usersModels");
const { requestResponse } = require("../utils");
let response;

const absen = async (data) => {
  const { userid, username, status } = data;
  let start = new Date();
  start.setHours(0, 0, 0, 0);

  let end = new Date();
  end.setHours(23, 59, 59, 999);

  // const hour = new Date().getHours();
  const hour = 8; //hard code,entar kalo dh prokusi makek yang atas
  const time = new Date();
  if (hour < 8 || hour > 17)
    return (response = {
      ...requestResponse.success,
      msg: "Belum waktu nya absen",
    });

  const dateSort = await attendenceModel.find(
    {
      time: { $gte: start, $lt: end },
      userid,
      status,
    },
    { _id: 0, __v: 0 }
  );
  if (dateSort.length > 0)
    return (response = {
      ...requestResponse.success,
      msg: "Anda sudah absen",
      dateSort,
    });
  await attendenceModel.create({ userid, username, status });
  response = {
    ...requestResponse.success,
    msg: "Absen success",
  };
  return response;
};
const getToday = async () => {
  let start = new Date().setHours(0, 0, 0, 0);
  let end = new Date().setHours(23, 59, 59, 999);
  const todayAbsen = await attendenceModel.find(
    {
      time: { $gte: start, $lt: end },
    },
    { _id: 0, __v: 0, userid: 0 }
  );
  if (todayAbsen.length <= 0) {
    return (response = { ...requestResponse.success, msg: "Data is empty" });
  }
  return (response = { ...requestResponse.success, todayAbsen });
};

//get bedasarkan absen
const get = async () => {
  let date = new Date();
  let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  const monthAbsen = await attendenceModel
    .aggregate([
      { $match: { time: { $gte: firstDay, $lte: lastDay } } }, //clear _id sama __v
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$time" } },
          datas: { $push: "$$ROOT" },
        },
      },
    ])
    .sort({ _id: 1 });
  if (monthAbsen.length <= 0) {
    return (response = { ...requestResponse.success, msg: "Data is empty" });
  }

  return (response = { ...requestResponse.success, monthAbsen });
};

const getDetail = async (userid) => {
  let date = new Date();
  let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  const user = await userModel.findOne({ userid });
  if (!user) {
    return (response = { ...requestResponse.not_found, msg: "Data not found" });
  }
  const attendenceDetail = await attendenceModel
    .aggregate([
      { $match: { time: { $gte: firstDay, $lte: lastDay }, userid: userid } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$time" } },
          datas: { $push: "$$ROOT" },
        },
      },
    ])
    .sort({ _id: 1 });
  if (attendenceDetail.length <= 0) {
    return (response = { ...requestResponse.success, msg: "Data is empty" });
  }
  return (response = { ...requestResponse.success, attendenceDetail });
};
module.exports = { absen, get, getToday, getDetail };
