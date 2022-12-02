const { check } = require("express-validator");
module.exports.userRegistrationValidation = () => {
  return [
    check("firstname")
      .matches(/^[A-Za-z\-]{3,}$/)
      .withMessage(
        "Must Consists only Letters and hyphens(-) and Must be at least 3 character long"
      ),
    check("lastname")
      .matches(/^[A-Za-z\-]{3,}$/)
      .withMessage(
        "Must Consists only Letters and hyphens(-) and Must be at least 3 character long"
      ),
    check("email")
      .isEmail()
      .withMessage("Requires a valid email")
      .normalizeEmail(),
    check("password")
      .matches(/^[\w\d]{8,10}$/)
      .withMessage("Password Length Must be between 8 and 10")
      .custom((val, { req }) => val === req.body.cpassword)
      .withMessage("Password Mismatch"),
    check("cpassword")
      .matches(/^[\w\d]{8,10}$/)
      .withMessage("Password Length Must be between 8 and 10")
      .custom((val, { req }) => val === req.body.password)
      .withMessage("Password Mismatch"),
  ];
};

module.exports.userLoginValidation = () => {
  return [
    check("email")
      .isEmail()
      .withMessage("Requires a valid email")
      .normalizeEmail(),
    check("password")
      .matches(/^[\w\d]{8,10}$/)
      .withMessage("Password Length Must be between 8 and 10"),
  ];
};
