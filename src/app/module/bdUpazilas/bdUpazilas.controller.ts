import { Request, Response } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { UpazilaService } from './bdUpazilas.service';

const getAllUpazila = catchAsync(async (req: Request, res: Response) => {
  const result = await UpazilaService.getAllUpazila();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Upazilas retrived successful',
    data: result,
  });
});

const getAllUpazilaWithinDistrcts = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await UpazilaService.getAllUpazilaWithinDistrict(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'All Upazila retrived successful from a divsion',
      data: result,
    });
  },
);

const getSingleUpazila = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UpazilaService.getSingleUpazila(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Upazila retrived successful',
    data: result,
  });
});

export const UpazilaController = {
  getAllUpazila,
  getSingleUpazila,
  getAllUpazilaWithinDistrcts,
};
