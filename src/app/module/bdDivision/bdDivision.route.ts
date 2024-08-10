import express from 'express';
import { DivisionController } from './bdDivision.controller';

const router = express.Router();

router.get('/', DivisionController.getAllDivision);
router.get('/:id', DivisionController.getSingleDivision);

export const divisionRouter = router;
