import express from 'express';
import { UnionController } from './bdUnion.controller';

const router = express.Router();

router.get('/', UnionController.getAllUnion);
router.get('/:id', UnionController.getSingleUnion);
router.get('/from-a-upazilla/:id', UnionController.getAllUnionWithinAUpazila);

export const unionRouter = router;
