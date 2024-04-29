import express from 'express';
import { brand_controller } from './brand.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { brandValidation } from './brand.validation';

const router = express.Router()

router.post('/create-brand', validateRequest(brandValidation.createBrandValidationSchema), brand_controller.create_brand)

export const brand_router = router