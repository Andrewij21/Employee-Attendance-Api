const router = require("express").Router();
const { requestResponse } = require("../utils");
const authRoute = require("./authRouter");
const attendenceRoute = require("./attendenceRouter");
const userRoute = require("./userRouter");
const coordinateRoute = require("./coordinateRouter");
const { authenticateToken } = require("../middleware/verifyToken");

router.get("/content", authenticateToken, (req, res) => {
  res.json({ ...requestResponse.success, data: req.user.email });
});

router.use("/auth", authRoute);
router.use("/attendence", attendenceRoute);
router.use("/user", userRoute);
router.use("/coordinate", coordinateRoute);
module.exports = router;
