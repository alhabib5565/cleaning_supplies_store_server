import httpStatus from 'http-status';
import { QueryBuilder } from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';

const getAlluser = async (query: Record<string, unknown>) => {
  const searchAbleFields = ['name', 'email'];
  const userQuery = new QueryBuilder(query, User.find())
    .search(searchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await userQuery.countTotal();
  const result = await userQuery.modelQuery;
  return {
    meta,
    result,
  };
};

const getSingleUser = async (userId: string) => {
  const result = await User.findOne({ userId });
  return result;
};

const updateUser = async (userId: string, payload: Partial<TUser>) => {
  const user = await User.findOne({ userId });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!!');
  }

  const result = await User.findOneAndUpdate({ userId }, payload, {
    new: true,
  });
  return result;
};

export const UserService = {
  getAlluser,
  getSingleUser,
  updateUser,
};
