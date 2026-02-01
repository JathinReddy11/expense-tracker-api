function errorHandler(err, req, res, _next) {
  if (err.code === '23505') {
    const error_status = 409;
    const error_message = 'Resource already exists';
    res.status(error_status).json({ success: false, error: { message: error_message } });
  }

  if (err.code === '23503') {
    const error_status = 400;
    const error_message = 'Invalid Reference';
    res.status(error_status).json({ success: false, error: { message: error_message } });
  }

  if (err.code === '22P02') {
    const error_status = 400;
    const error_message = 'Invalid Input';
    res.status(error_status).json({ success: false, error: { message: error_message } });
  }

  if (err.message === 'INVALID_CREDENTIALS') {
    const error_status = 404;
    const error_message = 'Invalid Credentials';
    res.status(error_status).json({ success: false, error: { message: error_message } });
  }

  if (err.message === 'RESOURCE_NOT_FOUND') {
    const error_status = 404;
    const error_message = 'Resource not found';
    res.status(error_status).json({ success: false, error: { message: error_message } });
  }

  if (err.message === 'Unauthorized') {
    const error_status = 401;
    const error_message = 'Invalid Credentials';
    res.status(error_status).json({ success: false, error: { message: error_message } });
  }

  if (err.message === 'RESOURCE_NOT_FOUND') {
    const error_status = 404;
    const error_message = 'Resource not found';
    res.status(error_status).json({ success: false, error: { message: error_message } });
  }

  if (err.message === 'INVALID_INPUT') {
    const error_status = 401;
    const error_message = 'Invalid input';
    res.status(error_status).json({ success: false, error: { message: error_message } });
  }

  const error_status = 500;
  const error_message = 'Internal Server Error';
  res.status(error_status).json({ success: false, error: { message: error_message } });
}

module.exports = errorHandler;
