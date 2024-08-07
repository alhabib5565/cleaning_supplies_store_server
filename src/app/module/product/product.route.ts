import express from 'express';
import { product_controller } from './product.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { ProductValidations } from './product.validation';

const router = express.Router();

router.post(
  '/create-product',
  validateRequest(ProductValidations.createProductValidationSchema),
  product_controller.create_product,
);
router.get('/', product_controller.get_all_products);
router.get('/:id', product_controller.get_single_product);
router.put(
  '/add-flash-sale/:productId',
  validateRequest(ProductValidations.addFlashSaleFormValidationSchema),
  product_controller.addToFlashSale,
);
router.get(
  '/flash-sale/all-flash-sale',
  product_controller.getAllFlashSaleProducts,
);

export const product_router = router;
