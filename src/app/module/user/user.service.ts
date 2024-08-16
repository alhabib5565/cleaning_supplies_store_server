import httpStatus from 'http-status';
import { QueryBuilder } from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';
import { Types } from 'mongoose';

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

const getMe = async (userId: string) => {
  // const result = await User.findOne({ _id: userId });
  // return result;
  const result = await User.aggregate([
    {
      $match: { _id: new Types.ObjectId(userId) },
    },
    {
      $lookup: {
        from: 'bd-divisions',
        foreignField: 'id',
        localField: 'userLocation.division',
        as: 'division',
      },
    },
    {
      $unwind: {
        path: '$division',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: 'bd-districts',
        foreignField: 'id',
        localField: 'userLocation.district',
        as: 'district',
      },
    },
    {
      $unwind: {
        path: '$district',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: 'bd-upazilas',
        foreignField: 'id',
        localField: 'userLocation.upazila',
        as: 'upazila',
      },
    },
    {
      $unwind: {
        path: '$upazila',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $addFields: {
        'userLocation.division': '$division.name',
        'userLocation.district': '$district.name',
        'userLocation.upazila': '$upazila.name',
      },
    },
    {
      $project: {
        division: 0,
        district: 0,
        upazila: 0,
      },
    },
  ]);

  return result[0];
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
  getMe,
};
