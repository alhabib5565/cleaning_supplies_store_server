import express from 'express';
import cors from 'cors';
import { category_router } from './app/module/category/category.route';
import { product_router } from './app/module/product/product.route';
import { brand_router } from './app/module/brand/brand.route';
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/category', category_router)
app.use('/api/v1/product', product_router)
app.use('/api/v1/brand', brand_router)

export { app };
