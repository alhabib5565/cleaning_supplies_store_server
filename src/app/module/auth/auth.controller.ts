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
    const result = await UserService.loginUser(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'User Loggin succesfull',
        data: result
    })
})

export const AuthController = {
    createUser,
    loginUser
}