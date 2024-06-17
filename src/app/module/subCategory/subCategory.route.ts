import express from 'express';

import { validateRequest } from '../../middlewares/validateRequest';
import { SubCategoryController } from './subCategory.controller';
import { SubCategoryValidation } from './subCategory.validation';

const router = express.Router()


router.post(
    '/create-sub-category',
    validateRequest(SubCategoryValidation.createSubCategoryValidationSchema),
    SubCategoryController.createSubCategory
)
router.get(
    '/',
    SubCategoryController.getAllSubCategories
)
router.get(
    '/:id',
    SubCategoryController.getSingleSubCategory
)

export const subCategoryRouter = router


