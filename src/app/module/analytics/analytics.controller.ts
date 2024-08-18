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

const getTotalCountWithLastMonthPercentageForUser = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AnalyticsService.getTotalCountWithLastMonthPercentageForUser(
        req.user.user_id,
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message:
        'Get total count with last month percentage for user retrived successful',
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

const totalSalePerMonthForAYear = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AnalyticsService.totalSalePerMonthForAYear();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: ' Total sales sales per month for a year retrived successful',
      data: result,
    });
  },
);

const orderStatusOverview = catchAsync(async (req: Request, res: Response) => {
  const result = await AnalyticsService.orderStatusOverview();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Order status overview retrived successful',
    data: result,
  });
});

const userStatusOverview = catchAsync(async (req: Request, res: Response) => {
  const result = await AnalyticsService.userStatusOverview();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'user status overview retrived successful',
    data: result,
  });
});

export const AnalyticsController = {
  getTotalCountWithLastMonthPercentage,
  getLastSavenTotalSales,
  totalSalePerMonthForAYear,
  orderStatusOverview,
  userStatusOverview,
  getTotalCountWithLastMonthPercentageForUser,
};
