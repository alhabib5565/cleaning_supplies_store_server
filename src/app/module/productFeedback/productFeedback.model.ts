import { model, Schema } from 'mongoose';
import { TProductFeedback } from './productFeedback.interface';

const productFeedbackSchema = new Schema<TProductFeedback>(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Products', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true },
    review: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const productFeedback = model('ProductFeedback', productFeedbackSchema);
