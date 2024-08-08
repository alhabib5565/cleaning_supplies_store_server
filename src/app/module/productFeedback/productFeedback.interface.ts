import { Types } from 'mongoose';

export type TProductFeedback = {
  productId: Types.ObjectId;
  userId: Types.ObjectId;
  rating: number;
  review: string;
};
