import express from 'express';
import { UserController } from './user.controller';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.get('/', UserController.getAlluser);
router.get('/:id', UserController.getSingleUser);
router.put('/:id', UserController.updateUser);
router.get('/getMe/me', auth('Customer', 'Admin'), UserController.getMe);

export const user_router = router;
