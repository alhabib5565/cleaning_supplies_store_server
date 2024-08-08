import { Request, Response } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { MainCategoryService } from './mainCategory.service';

const createMainCategory = catchAsync(async (req: Request, res: Response) => {
  const category = req.body;
  const result = await MainCategoryService.createMainCategoryIntoDB(category);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Main category create successful',
    data: result,
  });
});

const getAllMainCategories = catchAsync(async (req: Request, res: Response) => {
  const { result, meta } = await MainCategoryService.getAllMainCategoryFromDB(
    req.query,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Main categories retrived successful',
    meta,
    data: result,
  });
});

const getCategoriesForDropdown = catchAsync(
  async (req: Request, res: Response) => {
    const result = await MainCategoryService.getCategoriesForDropdown();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Retrived categories for dropdown successful',
      data: result,
    });
  },
);

const getSingleMainCategory = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await MainCategoryService.getSingleMainCategoryFromDB(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Main category retrived successful',
      data: result,
    });
  },
);

export const MainCategoryController = {
  createMainCategory,
  getAllMainCategories,
  getCategoriesForDropdown,
  getSingleMainCategory,
};
