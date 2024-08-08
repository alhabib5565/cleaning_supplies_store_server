/* eslint-disable @typescript-eslint/no-explicit-any */
import { startSession } from 'mongoose';
import { TProductFeedback } from './productFeedback.interface';
import { Product_model } from '../product/product.model';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import { productFeedback } from './productFeedback.model';

const createProductFeedback = async (payload: TProductFeedback) => {
  const isProductExists = await Product_model.findById(payload.productId);
  if (!isProductExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This product is not found!!');
  }

  const isFeedbackGiven = await productFeedback.findOne({
    productId: payload.productId,
    userId: payload.userId,
  });

  if (isFeedbackGiven) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'User has already given feedback for this product.',
    );
  }

  const session = await startSession();
  session.startTransaction();

  try {
    const review = await productFeedback.create([payload], { session });

    const feedbackAggregation = await productFeedback.aggregate([
      {
        $match: { product: payload.productId },
      },
      {
        $group: {
          _id: '$productId',
          averageRating: { $avg: '$rating' },
          ratingCount: { $sum: 1 },
        },
      },
    ]);

    const updateRatingInfo =
      feedbackAggregation.length > 0
        ? {
            rating: (feedbackAggregation[0].averageRating + payload.rating) / 2,
            ratingCount: feedbackAggregation[0].ratingCount + 1,
          }
        : {
            rating: payload.rating,
            ratingCount: 1,
          };

    await Product_model.updateOne(
      {
        _id: payload.productId,
      },
      updateRatingInfo,
    );

    await session.commitTransaction();
    await session.endSession();

    return review;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

export const ProductFeedbackService = {
  createProductFeedback,
};
