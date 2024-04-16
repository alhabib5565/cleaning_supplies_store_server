import express from 'express';
import { category_controller } from './category.controller';

const router = express.Router()

router.post('/create-category', category_controller.create_category)


export const category_router = router


