import express from 'express';
import { category_controller } from './category.controller';
import { categoryValidation } from './category.validation';
import { validateRequest } from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-category',
  validateRequest(categoryValidation.createCategoryValidationSchema),
  category_controller.create_category,
);
router.get('/', category_controller.get_all_categories);
router.get('/:id', category_controller.get_single_category);
router.get('/top/categories', category_controller.getTopCategories);

export const category_router = router;
