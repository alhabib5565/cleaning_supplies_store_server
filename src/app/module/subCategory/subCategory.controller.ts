import { Request, Response } from "express"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status"
import { catchAsync } from "../../utils/catchAsync"
import { SubCategoryService } from "./subCategory.service"


const createSubCategory = catchAsync(async (req: Request, res: Response) => {
    const category = req.body
    const result = await SubCategoryService.createSubCategoryIntoDB(category)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Sub category create successful',
        data: result
    })
})


const getAllSubCategories = catchAsync(async (req: Request, res: Response) => {
    const result = await SubCategoryService.getAllSubCategoryFromDB()

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Sub categories retrived successful',
        data: result
    })
})

const getSingleSubCategory = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await SubCategoryService.getSingleSubCategoryFromDB(id)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Sub category retrived successful',
        data: result
    })
})


export const SubCategoryController = {
    createSubCategory,
    getAllSubCategories,
    getSingleSubCategory
}