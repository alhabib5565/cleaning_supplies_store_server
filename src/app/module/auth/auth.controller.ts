import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { UserService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";


const createUser = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.createUserIntoDB(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Registration succesfull',
        data: result
    })
})

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const { accessToken, refreshToken } = await UserService.loginUser(req.body)
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true
    })
    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'User Loggin succesfull',
        data: accessToken
    })
})

const changePassword = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.changePassword(req.user, req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Password change succesfull',
        data: result
    })
})

const requestPasswordReset = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.requestPasswordReset(req.body.email)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Send password reset link',
        data: result
    })

    return null
})

export const AuthController = {
    createUser,
    loginUser,
    changePassword,
    requestPasswordReset
}