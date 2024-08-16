import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { generateUserId } from '../user/user.utils';
import { TLoginUser, TVerifyEmailPayload } from './auth.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
import {
  createToken,
  generateVerificationCode,
  verifyToken,
} from './auth.utils';
import { JwtPayload } from 'jsonwebtoken';
import { sendEmail } from '../../utils/sendMail';

const createUserIntoDB = async (payload: TUser) => {
  const { verificationCode, verificationExpires } = generateVerificationCode();
  // try {
  payload.userId = 'C-' + (await generateUserId());
  payload.role = 'Customer';
  payload.verificationCode = verificationCode;
  payload.verificationExpires = verificationExpires;

  const result = await User.create(payload);

  // send verification email
  await sendEmail(
    payload.email,
    'Verify your email within 1 minute',
    `Your varification code is: ${verificationCode}`,
  );
  return result;
  // } catch (error) {
  //   throw new AppError(BAD_REQUEST, error.message);
  // }
};

const verifyEmail = async (payload: TVerifyEmailPayload) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (user.isVerified) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user already verifyed!');
  }

  if (user.verificationCode !== payload.verificationCode) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Invalid verification code. Please request a new code and try again',
    );
  }

  if (user.verificationExpires < Date.now()) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'The verification code has expired. Please request a new code and try again',
    );
  }

  await User.findOneAndUpdate(
    { email: payload.email },
    {
      isVerified: true,
      verificationCode: undefined,
      verificationExpires: undefined,
    },
  );
  console.log(payload);
  return null;
};

const resendVerificationCode = async (payload: Partial<TUser>) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (user.isVerified) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user already verifyed!');
  }

  const { verificationCode, verificationExpires } = generateVerificationCode();

  await User.findOneAndUpdate(
    { email: payload.email },
    {
      verificationCode,
      verificationExpires,
    },
  );
  // send verification email
  await sendEmail(
    user.email,
    'Verify your email within 1 minute',
    `Your varification code is: ${verificationCode}`,
  );
};

const loginUser = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email }).select('+password');
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (!user.isVerified) {
    throw new AppError(httpStatus.FORBIDDEN, "This user isn't verifyed!");
  }

  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  if (user.status === 'Blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Password does not match!');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
    user_id: user._id,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: {
    currentPassword: string;
    newPassword: string;
  },
) => {
  const user = await User.findOne({
    email: userData.email,
    role: userData.role,
  }).select('+password');
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.currentPassword,
    user?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Password does not mathched');
  }

  if (payload.currentPassword === payload.newPassword) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Current password and new password are same',
    );
  }

  for (const pastPassword of user.passwordHistory) {
    const isNewPasswordMatched = await bcrypt.compare(
      payload.newPassword,
      pastPassword.password,
    );
    if (isNewPasswordMatched) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Password change failed. Ensure the new password is unique and not among the last 2 used',
      );
    }
  }

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  const result = await User.findOneAndUpdate(
    { email: user.email },
    {
      password: newHashedPassword,
      passwordHistory: [
        {
          password: user.password,
          changed_at: new Date(),
        },
        ...user.passwordHistory.slice(0, 1),
      ],
      passwordChangeAt: new Date(),
    },

    {
      new: true,
    },
  );
  return result;
};

const requestPasswordReset = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  if (user.status === 'Blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
    user_id: user._id,
  };

  const resetToken = createToken(
    jwtPayload,
    config.jwt_reset_password_secret as string,
    config.jwt_reset_password_expires_id as string,
  );

  const uiLink = `${config.reset_password_ui_link}&email=${user.email}&token=${resetToken}`;
  sendEmail(user.email, 'Reset password within 10 minute', uiLink);
};

const resetPassword = async (
  payload: { email: string; newPassword: string },
  token: string,
) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  if (user.status === 'Blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  const decoded = verifyToken(
    token,
    config.jwt_reset_password_secret as string,
  );

  if (payload.email !== decoded.email) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!');
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      email: decoded.email,
      role: decoded.role,
    },
    {
      password: newHashedPassword,
      passwordChangeAt: new Date(),
      passwordHistory: [],
    },
  );
};

const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
  }

  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const user = await User.findOne({ email: decoded.email, role: decoded.role });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  if (user.status === 'Blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
    user_id: user._id,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const AuthService = {
  createUserIntoDB,
  verifyEmail,
  resendVerificationCode,
  loginUser,
  changePassword,
  requestPasswordReset,
  resetPassword,
  refreshToken,
};
