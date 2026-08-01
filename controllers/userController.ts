import * as userService from 'services/userService';
import asyncHandler from 'utils/asyncHandler';
import { successResponse } from 'utils/response';

const getUsers = asyncHandler(async (req, res) => {
  const users = await userService.getUsers();
  successResponse(res, 'Users fetched successfully', users);
});

const createUser = asyncHandler(async (req, res) => {
  const user = await userService.createUser(req.body);
  successResponse(res, 'User created successfully', user, 201);
});

export { getUsers, createUser };
