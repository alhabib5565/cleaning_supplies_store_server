import express from 'express';

import { validateRequest } from '../../middlewares/validateRequest';
import { MainCategoryValidation } from './mainCategory.validation';
import { MainCategoryController } from './mainCategory.controller';

const router = express.Router()


router.post(
    '/create-main-category',
    validateRequest(MainCategoryValidation.createMainCategoryValidationSchema),
    MainCategoryController.createMainCategory
)
router.get(
    '/',
    MainCategoryController.getAllMainCategories
)
router.get(
    '/dropdown',
    MainCategoryController.getCategoriesForDropdown
)
router.get(
    '/:id',
    MainCategoryController.getSingleMainCategory
)

export const mainCategoryRouter = router


