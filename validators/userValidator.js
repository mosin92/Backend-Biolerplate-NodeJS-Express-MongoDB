const { errorResponse } = require('../utils/response');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateUser = (req, res, next) => {
  const { name, email } = req.body;

  if (!name || typeof name !== 'string' || !name.trim()) {
    return errorResponse(res, 'Name is required', 400);
  }

  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
    return errorResponse(res, 'A valid email is required', 400);
  }

  next();
};

module.exports = {
  validateUser
};
