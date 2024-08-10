import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { productFeedbackValidation } from './productFeedback.validation';
import { productFeedbackController } from './productFeedback.controller';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-feedback',

  validateRequest(productFeedbackValidation.createProductFeedbackSchema),
  auth(),
  productFeedbackController.createProductFeedback,
);

export const productFeedbackRouter = router;
