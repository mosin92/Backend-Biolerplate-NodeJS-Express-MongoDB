import User, { IUser } from 'models/User';

const getUsers = async (): Promise<IUser[]> => {
  return User.find();
};

interface CreateUserPayload {
  name: string;
  email: string;
}

const createUser = async (payload: CreateUserPayload): Promise<IUser> => {
  const user = new User(payload);
  return user.save();
};

export { getUsers, createUser };
