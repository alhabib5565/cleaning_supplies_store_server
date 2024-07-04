import { TUser } from "../user/user.interface";

export type TLoginUser = Pick<TUser, 'email' | 'password'>