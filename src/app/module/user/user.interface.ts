import { USER_ROLE, USER_STATUS } from './user.constant';

export type TPasswordHistory = {
  password: string;
  changed_at: Date;
};

export type TUserLocation = {
  division?: string;
  district?: string;
  upazila?: string;
  union?: string;
  area?: string;
};

export type TUser = {
  userId: string;
  name: string;
  email: string;
  role: TUserRole;
  password: string;
  passwordHistory: TPasswordHistory[];
  passwordChangeAt: Date;
  status: TUserStatus;
  isDeleted: boolean;
  isVerified: boolean;
  imageURL?: string;
  phone?: number;
  userLocation?: TUserLocation;
  verificationCode: number;
  verificationExpires: number;
};

export type TUserStatus = keyof typeof USER_STATUS;

export type TUserRole = keyof typeof USER_ROLE;
