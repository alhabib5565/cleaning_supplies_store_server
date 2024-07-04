import express from 'express';
import { AuthController } from './auth.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { UserValidation } from '../user/user.validation';
import { AuthValidation } from './auth.validation';

const router = express.Router()

router.post(
    '/create-user',
    validateRequest(UserValidation.createUserValidationSchema),
    AuthController.createUser
)

router.post(
    '/login',
    validateRequest(AuthValidation.loginUserValidationSchema),
    AuthController.loginUser
)

export const authRouter = router