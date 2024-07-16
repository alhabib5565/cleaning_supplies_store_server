import { Product_model } from './product.model';

export const generatProductId = async () => {
  let currentId = '0';

  const lastProductId = await Product_model.findOne({}, { productId: 1 }).sort({
    createdAt: -1,
  });
  if (lastProductId) {
    currentId = lastProductId.productId;
  }
  return (Number(currentId) + 1).toString().padStart(4, '0');
};
