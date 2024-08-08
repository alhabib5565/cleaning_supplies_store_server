import express from 'express';
import { category_router } from '../module/category/category.route';
import { product_router } from '../module/product/product.route';
import { brand_router } from '../module/brand/brand.route';
import { mainCategoryRouter } from '../module/mainCategory/mainCategory.route';
import { subCategoryRouter } from '../module/subCategory/subCategory.route';
import { colorRouter } from '../module/color/color.routes';
import { authRouter } from '../module/auth/auth.route';
import { orderRouter } from '../module/order/order.route';
import { productFeedbackRouter } from '../module/productFeedback/productFeedback.route';
const router = express.Router();

const appRoutes = [
  {
    path: '/main-categories',
    routes: mainCategoryRouter,
  },
  {
    path: '/categories',
    routes: category_router,
  },
  {
    path: '/sub-categories',
    routes: subCategoryRouter,
  },
  {
    path: '/colors',
    routes: colorRouter,
  },
  {
    path: '/products',
    routes: product_router,
  },
  {
    path: '/brands',
    routes: brand_router,
  },
  {
    path: '/auth',
    routes: authRouter,
  },
  {
    path: '/orders',
    routes: orderRouter,
  },
  {
    path: '/feedbacks',
    routes: productFeedbackRouter,
  },
];

appRoutes.map((routes) => router.use(routes.path, routes.routes));

export const routes = router;
