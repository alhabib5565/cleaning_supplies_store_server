import { Request, Response } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { UnionService } from './bdUnion.service';

const getAllUnion = catchAsync(async (req: Request, res: Response) => {
  const result = await UnionService.getAllUnion();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Unions retrived successful',
    data: result,
  });
});

const getAllUnionWithinAUpazila = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await UnionService.getAllUnionWithinAUpazila(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'All Union retrived successful from a divsion',
      data: result,
    });
  },
);

const getSingleUnion = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UnionService.getSingleUnion(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Union retrived successful',
    data: result,
  });
});

export const UnionController = {
  getAllUnion,
  getSingleUnion,
  getAllUnionWithinAUpazila,
};
