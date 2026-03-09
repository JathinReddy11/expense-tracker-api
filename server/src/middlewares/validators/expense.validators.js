const { body, query, param } = require('express-validator');

const createExpenseValidator = [
  body('category_id')
    .exists({ values: 'falsy' })
    .withMessage('category_id is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('category_id must be a number and greater than 0'),

  body('amount')
    .exists({ values: 'falsy' })
    .withMessage('amount is required')
    .bail()
    .isFloat({ min: 0.01 })
    .withMessage('amount should be greater than zero'),

  body('description')
    .trim()
    .exists({ values: 'falsy' })
    .withMessage("Description shouldn't be empty")
    .bail()
    .isLength({ max: 255 })
    .withMessage("Description shouldn't exceed more than 255 characters."),

  body('expense_date')
    .optional()
    .notEmpty()
    .bail()
    .isISO8601()
    .withMessage('expense_date must be in YYYY-MM-DD format')
    .toDate(),
];

const getExpenseValidator = [
  query('category_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Category id must be a number and greater than 0')
    .bail()
    .toInt(),

  query('expense_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Expense id must be a number and greater than 0')
    .bail()
    .toInt(),

  query('page_number')
    .optional()
    .isInt({ min: 1 })
    .withMessage('page number must be a number and greater than 0')
    .bail()
    .toInt(),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 30 })
    .withMessage('Limit must be a number, it should be between 1 and 30')
    .bail()
    .toInt(),

  query('startDate')
    .optional()
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage('Date must be in format yyyy-mm-dd')
    .bail()
    .isISO8601({ strict: true, strictSeparator: true })
    .withMessage('Date must be in format yyyy-mm-dd')
    .bail()
    .toDate(),

  query('endDate')
    .optional()
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage('Date must be in format yyyy-mm-dd')
    .bail()
    .isISO8601({ strict: true, strictSeparator: true })
    .withMessage('Date must be in format yyyy-mm-dd')
    .bail()
    .toDate(),

  query('sortBy').optional().notEmpty().withMessage('sortBy cannot be empty').bail(),

  query('order').optional().trim().notEmpty().withMessage('order cannot be empty').bail(),
];

const updateExpenseValidator = [
  param('expense_id').isInt({ min: 1 }).withMessage('Expense ID must be a valid number'),

  body('category_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('category_id must be a number and greater than 0'),

  body('amount')
    .optional()
    .isFloat({ min: 0.01 })
    .withMessage('amount should be greater than zero'),

  body('description')
    .optional()
    .isString()
    .withMessage('Description must be string')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Description cannot be empty')
    .bail()
    .isLength({ max: 255 })
    .withMessage("Description shouldn't exceed more than 255 characters."),

  body('expense_date')
    .optional()
    .isISO8601()
    .withMessage('expense_date must be in YYYY-MM-DD format'),
];

const deleteExpenseValidator = [
  param('expense_id').isInt({ min: 1 }).withMessage('Expense ID must be a valid number'),
];

const exportExpenseValidator = [
  query('category_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Category id must be a number and greater than 0')
    .bail()
    .toInt(),

  query('startDate')
    .optional()
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage('Date must be in format yyyy-mm-dd')
    .bail()
    .isISO8601({ strict: true, strictSeparator: true })
    .withMessage('Date must be in format yyyy-mm-dd')
    .bail()
    .toDate(),

  query('endDate')
    .optional()
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage('Date must be in format yyyy-mm-dd')
    .bail()
    .isISO8601({ strict: true, strictSeparator: true })
    .withMessage('Date must be in format yyyy-mm-dd')
    .bail()
    .toDate(),

  query('sortBy').optional().trim().notEmpty().withMessage('sortBy cannot be empty').bail(),

  query('order').optional().trim().notEmpty().withMessage('order cannot be empty').bail(),
];

module.exports = {
  createExpenseValidator,
  getExpenseValidator,
  updateExpenseValidator,
  deleteExpenseValidator,
  exportExpenseValidator,
};
