import express from 'express';
import { ColorController } from './color.controller';

const router = express.Router()


router.post(
    '/create-color',
    ColorController.createColor
)
router.get(
    '/',
    ColorController.getAllColors
)
router.get(
    '/:id',
    ColorController.getSingleColor
)

export const colorRouter = router


