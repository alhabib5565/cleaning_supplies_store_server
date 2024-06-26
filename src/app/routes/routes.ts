import express from 'express';
import { category_router } from '../module/category/category.route';
import { product_router } from '../module/product/product.route';
import { brand_router } from '../module/brand/brand.route';
import { mainCategoryRouter } from '../module/mainCategory/mainCategory.route';
import { subCategoryRouter } from '../module/subCategory/subCategory.route';
import { colorRouter } from '../module/color/color.routes';
const router = express.Router()

const appRoutes = [
    {
        path: '/main-categories',
        routes: mainCategoryRouter
    },
    {
        path: '/categories',
        routes: category_router
    },
    {
        path: '/sub-categories',
        routes: subCategoryRouter
    },
    {
        path: '/colors',
        routes: colorRouter
    },
    {
        path: '/products',
        routes: product_router
    },
    {
        path: '/brands',
        routes: brand_router
    },
]

appRoutes.map((routes) => router.use(routes.path, routes.routes))



export const routes = router