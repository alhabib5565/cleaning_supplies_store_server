import express from 'express';
import { AuthController } from './auth.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { UserValidation } from '../user/user.validation';
import { AuthValidation } from './auth.validation';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserValidationSchema),
  AuthController.createUser,
);

router.post(
  '/verify-email',
  validateRequest(AuthValidation.verifyEmailValidationSchema),
  AuthController.verifyEmail,
);

router.post(
  '/resend-verification-code',
  validateRequest(AuthValidation.verifyResendVerificationCode),
  AuthController.resendVerificationCode,
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginUserValidationSchema),
  AuthController.loginUser,
);

router.post('/change-password', auth(), AuthController.changePassword);

router.post('/request-for-reset-password', AuthController.requestPasswordReset);

router.post('/reset-password', AuthController.resetPassword);

router.post('/refresh-toekn', AuthController.refreshToken);

export const authRouter = router;
