const config = require('../config');

const errorHandler = (err, req, res, next) => {
  console.error(err);

  let statusCode = err.statusCode || err.status || 500;
  let message = err.message || 'Internal server error';

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ');
  } else if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    message = `${field} already exists`;
  } else if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  if (statusCode === 500 && config.nodeEnv === 'production' && !err.isOperational) {
    message = 'Internal server error';
  }

  res.status(statusCode).json({
    success: false,
    message
  });
};

module.exports = errorHandler;
