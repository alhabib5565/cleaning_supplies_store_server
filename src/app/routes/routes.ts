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
import { divisionRouter } from '../module/bdDivision/bdDivision.route';
import { districtRouter } from '../module/bdDistricts/bdDistricts.route';
import { upazilaRouter } from '../module/bdUpazilas/bdUpazilas.route';
import { unionRouter } from '../module/bdUnion/bdUnion.route';
import { user_router } from '../module/user/user.route';
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
    path: '/users',
    routes: user_router,
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
  {
    path: '/divisions',
    routes: divisionRouter,
  },
  {
    path: '/districts',
    routes: districtRouter,
  },
  {
    path: '/upazilas',
    routes: upazilaRouter,
  },
  {
    path: '/unions',
    routes: unionRouter,
  },
];

appRoutes.map((routes) => router.use(routes.path, routes.routes));

export const routes = router;
