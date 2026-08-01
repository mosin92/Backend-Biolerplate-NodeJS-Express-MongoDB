const User = require('../models/User');

const getUsers = async () => {
  return await User.find();
};

const createUser = async (payload) => {
  const user = new User(payload);
  return await user.save();
};

module.exports = {
  getUsers,
  createUser
};
