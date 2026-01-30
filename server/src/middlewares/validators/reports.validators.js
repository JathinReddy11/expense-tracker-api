const { query } = require("express-validator");

const monthlyExpenseValidator = [
  query("year")
    .exists({ values: "falsy" })
    .withMessage("Year shouldn't be empty")
    .bail()
    .isInt({ min: 1970, max: new Date().getFullYear() })
    .withMessage(`Year should be between 1970 and ${new Date().getFullYear()}`)
    .toInt(),

  query("month")
    .exists({ values: "falsy" })
    .withMessage("Month shouldn't be empty")
    .bail()
    .isInt({ min: 1, max: 12 })
    .withMessage("Month should be between 1 and 12")
    .toInt(),
];

const yearlyExpenseValidator = [
  query("year")
    .exists({ values: "falsy" })
    .withMessage("Year shouldn't be empty")
    .bail()
    .isInt({ min: 1970, max: new Date().getFullYear() })
    .withMessage(`Year should be between 1970 and ${new Date().getFullYear()}`)
    .toInt(),
];

const getCategoryWiseSummaryValidators = [
  query("start_date")
    .exists({ values: "falsy" })
    .withMessage("Start Date shouldn't be empty")
    .bail()
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage("Date must be in format yyyy-mm-dd")
    .bail()
    .isISO8601({ strict: true, strictSeparator: true })
    .withMessage("Date must be in format yyyy-mm-dd")
    .bail()
    .toDate(),

  query("end_date")
    .exists({ values: "falsy" })
    .withMessage("End Date shouldn't be empty")
    .bail()
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage("Date must be in format yyyy-mm-dd")
    .bail()
    .isISO8601({ strict: true, strictSeparator: true })
    .withMessage("Date must be in format yyyy-mm-dd")
    .bail()
    .toDate(),
];

module.exports = {
  monthlyExpenseValidator,
  yearlyExpenseValidator,
  getCategoryWiseSummaryValidators,
};
