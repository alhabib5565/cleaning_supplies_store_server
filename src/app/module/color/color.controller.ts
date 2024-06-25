import { Request, Response } from "express"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status"
import { catchAsync } from "../../utils/catchAsync"
import { ColorService } from "./color.service"


const createColor = catchAsync(async (req: Request, res: Response) => {
    const color = req.body
    const result = await ColorService.createColorIntoDB(color)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Color create succesfull',
        data: result
    })
})


const getAllColors = catchAsync(async (req: Request, res: Response) => {
    const result = await ColorService.getAllColorFromDB()

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Colors retrived succesfull',
        data: result
    })
})

const getSingleColor = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await ColorService.getSingleColorFromDB(id)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Color retrived succesfull',
        data: result
    })
})


export const ColorController = {
    createColor,
    getAllColors,
    getSingleColor
}