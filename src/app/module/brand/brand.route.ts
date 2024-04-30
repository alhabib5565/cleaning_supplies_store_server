import express from 'express';
import { brand_controller } from './brand.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { brandValidation } from './brand.validation';

const router = express.Router()

router.post('/create-brand', validateRequest(brandValidation.createBrandValidationSchema), brand_controller.create_brand)
router.get('/', brand_controller.get_all_brands)
router.get('/:id', brand_controller.get_single_brands)

export const brand_router = router