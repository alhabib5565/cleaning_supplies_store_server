import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { generateUserId } from "../user/user.utils";
import { TLoginUser } from "./auth.interface";
import bcrypt from 'bcrypt';
import config from "../../config";
import { createToken } from "./auth.utils";
import { JwtPayload } from "jsonwebtoken";
import { sendEmail } from "../../utils/sendMail";

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

    if (user.isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }

    if (user.status === 'Blocked') {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }

    const isPasswordMatched = await bcrypt.compare(payload.password, user?.password)
    if (!isPasswordMatched) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Password does not match!')
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

const changePassword = async (userData: JwtPayload, payload: {
    currentPassword: string,
    newPassword: string
}) => {
    const user = await User.findOne({ email: userData.email, role: userData.role }).select('+password')
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found')
    }

    const isPasswordMatched = await bcrypt.compare(payload.currentPassword, user?.password)
    if (!isPasswordMatched) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Password does not mathched')
    }

    if (payload.currentPassword === payload.newPassword) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Current password and new password are same')
    }

    for (const pastPassword of user.passwordHistory) {
        const isNewPasswordMatched = await bcrypt.compare(payload.newPassword, pastPassword.password)
        if (isNewPasswordMatched) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Password change failed. Ensure the new password is unique and not among the last 2 used')
        }
    }

    const newHashedPassword = await bcrypt.hash(payload.newPassword, Number(config.bcrypt_salt_rounds))

    const result = await User.findOneAndUpdate(
        { email: user.email },
        {
            password: newHashedPassword,
            passwordHistory: [
                {
                    password: user.password,
                    changed_at: new Date()
                },
                ...user.passwordHistory.slice(0, 1)
            ],
            passwordChangeAt: new Date
        },

        {
            new: true
        }
    )
    return result
}

const requestPasswordReset = async (email: string) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found')
    }

    if (user.isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }

    if (user.status === 'Blocked') {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }

    const jwtPayload = {
        email: user.email,
        role: user.role
    }

    const resetToken = createToken(jwtPayload, config.jwt_reset_password_secret as string, config.jwt_reset_password_expires_id as string)

    const uiLink = `${config.reset_password_ui_link}&email=${user.email}&token=${resetToken}`
    sendEmail(user.email, uiLink)
}


export const UserService = {
    createUserIntoDB,
    loginUser,
    changePassword,
    requestPasswordReset
}