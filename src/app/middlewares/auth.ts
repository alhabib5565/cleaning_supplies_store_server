import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../utils/catchAsync"
import AppError from "../error/AppError"
import httpStatus from "http-status"
import { verifyToken } from "../module/auth/auth.utils"
import config from "../config"
import { User } from "../module/user/user.model"

export const auth = () => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization
        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!')
        }

        const decoded = verifyToken(token, config.jwt_access_secret as string)

        const user = await User.findOne({ email: decoded.email, role: decoded.role })

        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'User not found')
        }

        if (user.isDeleted) {
            throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
        }

        if (user.status === 'Blocked') {
            throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
        }

        req.user = decoded

        next()
    })
}