import express from 'express';
import { category_controller } from './category.controller';
import { categoryValidation } from './category.validation';
import { validateRequest } from '../../middlewares/validateRequest';

const router = express.Router()


router.post('/create-category', validateRequest(categoryValidation.createCategoryValidationSchema), category_controller.create_category)


export const category_router = router


