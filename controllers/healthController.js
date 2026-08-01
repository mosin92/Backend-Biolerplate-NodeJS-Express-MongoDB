const { successResponse } = require('../utils/response');

const getHealth = (req, res) => {
  successResponse(res, 'Server is healthy', { timestamp: new Date().toISOString() });
};

module.exports = {
  getHealth
};
