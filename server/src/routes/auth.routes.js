const express = require("express");
const auth_Router = express.Router();
const {
  register,
  login,
  updateProfile,
  deleteProfile,
} = require("../controllers/auth/auth.controller");
const {
  registerValidator,
  loginValidator,
  updateValidator,
} = require("../middlewares/validators/auth.validators");
const {
  validateRequest,
} = require("../middlewares/validators/validateRequest");
const authMiddleware = require("../middlewares/auth.middleware");
const loginLimiter = require("../middlewares/loginLimitter.middleware");

auth_Router.post("/register", registerValidator, validateRequest, register);

auth_Router.post(
  "/login",
  loginLimiter,
  loginValidator,
  validateRequest,
  login,
);

auth_Router.patch(
  "/update",
  authMiddleware,
  updateValidator,
  validateRequest,
  updateProfile,
);

auth_Router.delete("/delete", authMiddleware, deleteProfile);

module.exports = auth_Router;
