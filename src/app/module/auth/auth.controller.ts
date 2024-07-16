import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { AuthService } from './auth.service';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import AppError from '../../error/AppError';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.createUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Registration successful',
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { accessToken, refreshToken } = await AuthService.loginUser(req.body);
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'User Loggin successful',
    data: { accessToken, refreshToken },
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.changePassword(req.user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Password change successful',
    data: result,
  });
});

const requestPasswordReset = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.requestPasswordReset(req.body.email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Send password reset link',
    data: result,
  });

  return null;
});

const refreshToken = catchAsync(async (req, res) => {
  console.log(req.cookies);
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved successfully!',
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Something went wrong !');
  }

  const result = await AuthService.resetPassword(req.body, token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset successfully!',
    data: result,
  });
});

export const AuthController = {
  createUser,
  loginUser,
  changePassword,
  requestPasswordReset,
  resetPassword,
  refreshToken,
};
