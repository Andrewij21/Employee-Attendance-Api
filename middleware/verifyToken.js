const jwt = require("jsonwebtoken");
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.json({ status: 401, mag: "Not Send A Token" });
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.json({ status: 403, msg: "expired token" });
    req.user = user;
    next();
  });
}
module.exports = { authenticateToken };
