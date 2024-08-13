import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.get('/', UserController.getAlluser);
router.get('/:id', UserController.getSingleUser);
router.put('/:id', UserController.updateUser);

export const user_router = router;
