const express = require('express');
const reports_Router = express.Router();
const {
  getMonthlyExpenseTotal,
  getYearlyExpenseTotal,
  getCategoryWiseSummary,
} = require('../controllers/reports/reports.controller');
const {
  monthlyExpenseValidator,
  yearlyExpenseValidator,
  getCategoryWiseSummaryValidators,
} = require('../middlewares/validators/reports.validators');
const { validateRequest } = require('../middlewares/validators/validateRequest');
const authMiddleware = require('../middlewares/auth.middleware');

reports_Router.get(
  '/monthly-total',
  authMiddleware,
  monthlyExpenseValidator,
  validateRequest,
  getMonthlyExpenseTotal
);

reports_Router.get(
  '/yearly-total',
  authMiddleware,
  yearlyExpenseValidator,
  validateRequest,
  getYearlyExpenseTotal
);

reports_Router.get(
  '/category-summary',
  authMiddleware,
  getCategoryWiseSummaryValidators,
  validateRequest,
  getCategoryWiseSummary
);

module.exports = reports_Router;
