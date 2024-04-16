import express from 'express';
import { brand_controller } from './brand.controller';

const router = express.Router()

router.post('/create-brand', brand_controller.create_brand)

export const brand_router = router