import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { generateUserId } from "../user/user.utils";
import { TLoginUser } from "./auth.interface";
import bcrypt from 'bcrypt';
import config from "../../config";
import { createToken } from "./auth.utils";

const createUserIntoDB = async (payLoad: TUser) => {
    payLoad.userId = 'C-' + await generateUserId()
    payLoad.role = "Customer"

    const result = await User.create(payLoad)
    return result
}

const loginUser = async (payload: TLoginUser) => {
    const user = await User.findOne({ email: payload.email }).select('+password')
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found')
    }

    const isPasswordMatched = await bcrypt.compare(payload.password, user?.password)
    if (!isPasswordMatched) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized user')
    }

    const jwtPayload = {
        email: user.email,
        role: user.role
    }

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
    }
}

export const UserService = {
    createUserIntoDB,
    loginUser
}