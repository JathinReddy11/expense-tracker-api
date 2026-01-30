const { body } = require("express-validator");

const registerValidator = [
  body("name")
    .trim()
    .exists({ values: "falsy" })
    .withMessage("name shouldn't be empty")
    .bail()
    .isLength({ max: 50 })
    .withMessage("Description shouldn't exceed more than 50 characters."),

  body("email")
    .trim()
    .exists({ values: "falsy" })
    .withMessage("Email is required")
    .bail()
    .toLowerCase()
    .isEmail()
    .withMessage("Follow the correct email format")
    .bail()
    .isLength({ max: 50 })
    .withMessage("Email shouldn't exceed more than 50 characters."),

  body("password")
    .trim()
    .exists({ values: "falsy" })
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password shouldn't be less than 8 characters."),
];

const loginValidator = [
  body("email")
    .trim()
    .exists({ values: "falsy" })
    .withMessage("Email is required")
    .bail()
    .toLowerCase()
    .isEmail()
    .withMessage("Follow the correct email format"),

  body("password").notEmpty().withMessage("Password is required"),
];

const updateValidator = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("name shouldn't be empty")
    .bail()
    .isLength({ max: 50 })
    .withMessage("Description shouldn't exceed more than 50 characters."),

  body("email")
    .optional()
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage("Follow the correct email format")
    .bail()
    .isLength({ max: 50 })
    .withMessage("Email shouldn't exceed more than 50 characters."),

  body("password")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("password shouldn't be empty")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password shouldn't be less than 8 characters."),
];

module.exports = { registerValidator, loginValidator, updateValidator };
