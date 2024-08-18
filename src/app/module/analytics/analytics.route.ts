import express from 'express';
import { auth } from '../../middlewares/auth';
import { AnalyticsController } from './analytics.controller';

const router = express.Router();

router.get(
  '/total-count-with-last-month-percentage',
  auth('Admin'),
  AnalyticsController.getTotalCountWithLastMonthPercentage,
);

router.get(
  '/total-count-with-last-month-percentage-for-user',
  auth('Customer'),
  AnalyticsController.getTotalCountWithLastMonthPercentageForUser,
);

router.get(
  '/last-saven-days-total-sales',
  auth('Admin'),
  AnalyticsController.getLastSavenTotalSales,
);

router.get(
  '/total-sale-per-month-for-a-year',
  auth('Admin'),
  AnalyticsController.totalSalePerMonthForAYear,
);

router.get(
  '/order-status-overview',
  auth('Admin'),
  AnalyticsController.orderStatusOverview,
);

router.get(
  '/user-status-overview',
  auth('Admin'),
  AnalyticsController.userStatusOverview,
);

export const analytictsRouter = router;
