import { Request, Response } from "express";
import { brand_service } from "./brand.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";

const create_brand = catchAsync(async (req: Request, res: Response) => {
    const brand = req.body
    const result = await brand_service.create_brand_into_DB(brand)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'brand create successful',
        data: result
    })
})

const get_all_brands = catchAsync(async (req: Request, res: Response) => {
    const result = await brand_service.get_all_brand_from_DB()

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'brands retrived successful',
        data: result
    })
})

const get_single_brands = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await brand_service.get_single_brand_from_DB(id)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'brand retrived successful',
        data: result
    })
})

export const brand_controller = {
    create_brand,
    get_all_brands,
    get_single_brands
}