const { body, validationResult } = require("express-validator");
const userValidationRules = [
  body("username").exists({ checkFalsy: true, checkNull: true }),
  body("email").isEmail().withMessage("Invalid Email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password at least 6 character"),
];

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  next();
}

module.exports = { userValidationRules, validate };
