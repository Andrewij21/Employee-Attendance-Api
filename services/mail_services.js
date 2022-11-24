require("dotenv").config();
const nodemailer = require("nodemailer");
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: true,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

const sendMail = ({ to, otp }) => {
  let mailOption = {
    from: `"Validation app "<andrewij2103@gmail.com>`,
    to: `${to}`,
    subject: "Vertifikasi OTP",
    html: `Don't shere this to anyone.Use this to validate your account.
    <br><br>
    <b>${otp}</b>
    `,
  };

  transporter.sendMail(mailOption, (err, data) => {
    if (err) return console.log("err : " + err);
    console.log("email di kirim");
  });
};

module.exports = { sendMail };
