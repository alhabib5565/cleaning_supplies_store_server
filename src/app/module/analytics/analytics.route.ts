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
  '/last-saven-days-total-sales',
  auth('Admin'),
  AnalyticsController.getLastSavenTotalSales,
);

export const analytictsRouter = router;
