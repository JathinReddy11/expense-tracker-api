function errorHandler(err, req, res, next) {
  if (err.code === "23505") {
    error_status = 409;
    error_message = "Resource already exists";
    res
      .status(error_status)
      .json({ success: false, error: { message: error_message } });
  }

  if (err.code === "23503") {
    error_status = 400;
    error_message = "Invalid Reference";
    res
      .status(error_status)
      .json({ success: false, error: { message: error_message } });
  }

  if (err.code === "22P02") {
    error_status = 400;
    error_message = "Invalid Input";
    res
      .status(error_status)
      .json({ success: false, error: { message: error_message } });
  }

  if (err.message === "INVALID_CREDENTIALS") {
    error_status = 404;
    error_message = "Invalid Credentials";
    res
      .status(error_status)
      .json({ success: false, error: { message: error_message } });
  }

  if (err.message === "RESOURCE_NOT_FOUND") {
    error_status = 404;
    error_message = "Resource not found";
    res
      .status(error_status)
      .json({ success: false, error: { message: error_message } });
  }

  if (err.message === "Unauthorized") {
    error_status = 401;
    error_message = "Invalid Credentials";
    res
      .status(error_status)
      .json({ success: false, error: { message: error_message } });
  }

  if (err.message === "RESOURCE_NOT_FOUND") {
    error_status = 404;
    error_message = "Resource not found";
    res
      .status(error_status)
      .json({ success: false, error: { message: error_message } });
  }

  if (err.message === "INVALID_INPUT") {
    error_status = 401;
    error_message = "Invalid input";
    res
      .status(error_status)
      .json({ success: false, error: { message: error_message } });
  }

  error_status = 500;
  error_message = "Internal Server Error";
  res
    .status(error_status)
    .json({ success: false, error: { message: err.message } });
}

module.exports = errorHandler;
