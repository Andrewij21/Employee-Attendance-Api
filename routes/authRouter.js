const router = require("express").Router();
const { requestResponse } = require("../utils");
const { userValidationRules, validate } = require("../middleware/validator");
const {
  createUser,
  loginUser,
  loginAdmin,
  verifyOtp,
  resendOtp,
} = require("../controllers/authController");

router.get("/login", (req, res) => {
  res.json({ ...requestResponse.success, msg: "Login Page" });
});
router.post("/loginUser", loginUser);
router.post("/loginAdmin", loginAdmin);
router.post("/register", userValidationRules, validate, createUser);
router.post("/validate", verifyOtp);
router.post("/resend-otp", resendOtp);
module.exports = router;
