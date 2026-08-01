const userService = require('../services/userService');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/response');

const getUsers = asyncHandler(async (req, res) => {
  const users = await userService.getUsers();
  successResponse(res, 'Users fetched successfully', users);
});

const createUser = asyncHandler(async (req, res) => {
  const user = await userService.createUser(req.body);
  successResponse(res, 'User created successfully', user, 201);
});

module.exports = {
  getUsers,
  createUser
};
