import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { AnalyticsService } from './analyticts.service';

const getTotalCountWithLastMonthPercentage = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AnalyticsService.getTotalCountWithLastMonthPercentage();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Get total count with last month percentage retrived successful',
      data: result,
    });
  },
);

const getLastSavenTotalSales = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AnalyticsService.getLastSavenTotalSales();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Last saven days total sales retrived successful',
      data: result,
    });
  },
);

export const AnalyticsController = {
  getTotalCountWithLastMonthPercentage,
  getLastSavenTotalSales,
};
