import express from 'express';
import { DistrictController } from './bdDistricts.controller';

const router = express.Router();

router.get('/', DistrictController.getAllDistrict);
router.get('/:id', DistrictController.getSingleDistrict);
router.get(
  '/from-a-division/:id',
  DistrictController.getAllDistrictWithinDivision,
);

export const districtRouter = router;
