const express = require('express');
const category_Router = express.Router();
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require('../controllers/category/category.controller');
const {
  createCategoryValidator,
  getCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require('../middlewares/validators/category.validators');
const { validateRequest } = require('../middlewares/validators/validateRequest');
const authMiddleware = require('../middlewares/auth.middleware');

category_Router.post(
  '/categories',
  authMiddleware,
  createCategoryValidator,
  validateRequest,
  createCategory
);

category_Router.get(
  '/categories',
  authMiddleware,
  getCategoryValidator,
  validateRequest,
  getCategories
);

category_Router.patch(
  '/categories/:category_id',
  authMiddleware,
  updateCategoryValidator,
  validateRequest,
  updateCategory
);

category_Router.delete(
  '/categories/:category_id',
  authMiddleware,
  deleteCategoryValidator,
  validateRequest,
  deleteCategory
);

module.exports = category_Router;
