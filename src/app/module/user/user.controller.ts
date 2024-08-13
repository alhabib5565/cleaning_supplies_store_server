import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { UserService } from './user.service';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';

const getAlluser = catchAsync(async (req: Request, res: Response) => {
  const { result, meta } = await UserService.getAlluser(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Users retrieved successfully.',
    meta,
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getSingleUser(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: `User with ID ${req.params.id} updated successfully.`,
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.updateUser(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: '',
    data: result,
  });
});

export const UserController = {
  getAlluser,
  getSingleUser,
  updateUser,
};
