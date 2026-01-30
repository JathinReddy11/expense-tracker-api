const { body, query, param } = require("express-validator");

const createCategoryValidator = [
  body("name")
    .trim()
    .exists({ values: "falsy" })
    .withMessage("Name shouldn't be empty")
    .bail()
    .isLength({ max: 50 })
    .withMessage("Name shouldn't exceed more than 50 characters."),
];

const getCategoryValidator = [
  query("page_number")
    .optional()
    .isInt({ min: 1 })
    .withMessage("page number must be a number and greater than 0")
    .bail()
    .toInt(),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 30 })
    .withMessage("Limit must be a number, it should be between 1 and 30")
    .bail()
    .toInt(),
];

const updateCategoryValidator = [
  param("category_id")
    .isInt({ min: 1 })
    .withMessage("Category ID must be a valid number"),

  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Name shouldn't be empty")
    .bail()
    .isLength({ max: 50 })
    .withMessage("Name shouldn't exceed more than 50 characters."),
];

const deleteCategoryValidator = [
  param("category_id")
    .isInt({ min: 1 })
    .withMessage("Category ID must be a valid number"),
];

module.exports = {
  createCategoryValidator,
  getCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
};
