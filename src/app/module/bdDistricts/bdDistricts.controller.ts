import { Request, Response } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { DistrictService } from './bdDistricts.service';

const getAllDistrict = catchAsync(async (req: Request, res: Response) => {
  const result = await DistrictService.getAllDistrict();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Districts retrived successful',
    data: result,
  });
});

const getAllDistrictWithinDivision = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await DistrictService.getAllDistrictWithinDivision(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'All District retrived successful from a divsion',
      data: result,
    });
  },
);

const getSingleDistrict = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await DistrictService.getSingleDistrict(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'District retrived successful',
    data: result,
  });
});

export const DistrictController = {
  getAllDistrict,
  getSingleDistrict,
  getAllDistrictWithinDivision,
};
