import { Response } from "express"

type TResponse<T> = {
    message: string,
    statusCode: number,
    success?: boolean,
    data: T
}

export const sendResponse = <T>(res: Response, data: TResponse<T>) => {

    res.status(data.statusCode).json({
        success: data.success || true,
        message: data.message,
        data: data.data
    })
}