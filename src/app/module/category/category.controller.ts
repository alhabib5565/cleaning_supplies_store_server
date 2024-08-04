import { Request, Response } from 'express';
import { category_services } from './category.service';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';

const create_category = catchAsync(async (req: Request, res: Response) => {
  const category = req.body;
  const result = await category_services.create_category_into_DB(category);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'category create successful',
    data: result,
  });
});

const get_all_categories = catchAsync(async (req: Request, res: Response) => {
  const result = await category_services.get_all_category_from_DB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'categories retrived successful',
    data: result,
  });
});

const get_single_category = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await category_services.get_single_category_from_DB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'category retrived successful',
    data: result,
  });
});

const getTopCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await category_services.getTopCategories();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Retrived top categories successful',
    data: result,
  });
});

export const category_controller = {
  create_category,
  get_all_categories,
  get_single_category,
  getTopCategories,
};
