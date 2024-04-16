import express from 'express';
import { product_controller } from './product.controller';

const router = express.Router()

router.post('/create-product', product_controller.create_product)


export const product_router = router


