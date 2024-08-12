import { TUser } from '../user/user.interface';

export type TLoginUser = Pick<TUser, 'email' | 'password'>;

export type TVerifyEmailPayload = {
  verificationCode: number;
  email: string;
};
