import express from 'express';
import { UpazilaController } from './bdUpazilas.controller';

const router = express.Router();

router.get('/', UpazilaController.getAllUpazila);
router.get('/:id', UpazilaController.getSingleUpazila);
router.get(
  '/from-a-districts/:id',
  UpazilaController.getAllUpazilaWithinDistrcts,
);

export const upazilaRouter = router;
