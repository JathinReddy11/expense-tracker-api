const express = require('express');
const expense_Router = express.Router();
const {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  exportExpenses,
} = require('../controllers/expense/expense.controller');
const {
  createExpenseValidator,
  getExpenseValidator,
  updateExpenseValidator,
  deleteExpenseValidator,
  exportExpenseValidator,
} = require('../middlewares/validators/expense.validators');
const { validateRequest } = require('../middlewares/validators/validateRequest');
const authMiddleware = require('../middlewares/auth.middleware');

expense_Router.post(
  '/expenses',
  authMiddleware,
  createExpenseValidator,
  validateRequest,
  createExpense
);

expense_Router.get('/expenses', authMiddleware, getExpenseValidator, validateRequest, getExpenses);

expense_Router.patch(
  '/expenses/:expense_id',
  authMiddleware,
  updateExpenseValidator,
  validateRequest,
  updateExpense
);

expense_Router.delete(
  '/expenses/:expense_id',
  authMiddleware,
  deleteExpenseValidator,
  validateRequest,
  deleteExpense
);

expense_Router.get(
  '/expenses/export',
  authMiddleware,
  exportExpenseValidator,
  validateRequest,
  exportExpenses
);

module.exports = expense_Router;
