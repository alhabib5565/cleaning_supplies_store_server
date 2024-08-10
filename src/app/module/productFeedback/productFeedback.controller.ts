import httpStatus from 'http-status';
import { sendResponse } from '../../utils/sendResponse';
import { ProductFeedbackService } from './productFeedback.service';
import { catchAsync } from '../../utils/catchAsync';
import { Request, Response } from 'express';

const createProductFeedback = catchAsync(
  async (req: Request, res: Response) => {
    req.body.userId = req.user.userId;
    const result = await ProductFeedbackService.createProductFeedback(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Feedback create successfull',
      data: result,
    });
  },
);

export const productFeedbackController = {
  createProductFeedback,
};
