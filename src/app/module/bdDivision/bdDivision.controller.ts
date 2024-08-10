import { Request, Response } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { DivisionService } from './bdDivision.service';

const getAllDivision = catchAsync(async (req: Request, res: Response) => {
  const result = await DivisionService.getAllDivision();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Divisions retrived successful',
    data: result,
  });
});

const getSingleDivision = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await DivisionService.getSingleDivisoin(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Division retrived successful',
    data: result,
  });
});

export const DivisionController = {
  getAllDivision,
  getSingleDivision,
};
