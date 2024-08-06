import httpStatus from 'http-status';
import { QueryBuilder } from '../../builder/QueryBuilder';
import { MainCategory } from '../mainCategory/mainCategory.model';
import { Product_model } from '../product/product.model';
import { TFlashSale, TProduct } from './product.interface';
import AppError from '../../error/AppError';
import { Category } from '../category/category.model';
import { SubCategory } from '../subCategory/subCategory.model';
import { generatProductId } from './product.utils';

const create_product_into_DB = async (payload: TProduct) => {
  const mainCategory = await MainCategory.findById(payload.mainCategory);
  if (!mainCategory) {
    throw new AppError(httpStatus.NOT_FOUND, 'Main category does not exist');
  }

  const category = await Category.findById(payload.category);
  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category does not exist');
  }

  const subCategory = await SubCategory.findById(payload.subCategory);
  if (!subCategory) {
    throw new AppError(httpStatus.NOT_FOUND, 'Sub Category does not exist');
  }
  payload.productId = await generatProductId();
  payload.availableQuantity = payload.totalQuantity;

  const result = await Product_model.create(payload);
  return result;
};

const get_all_products_from_DB = async (query: Record<string, unknown>) => {
  const searchAbleFields = [
    'productName',
    'mainCategory',
    'category',
    'subCategory',
    'metaTitle',
    'metaDescription',
  ];

  const modelQuery = new QueryBuilder(query, Product_model.find())
    .search(searchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await modelQuery.countTotal();
  const result = await modelQuery.modelQuery;
  return {
    meta,
    result,
  };
};

const get_single_products_from_DB = async (id: string) => {
  const result = await Product_model.findOne({ _id: id });
  return result;
};

const addToFlashSaleIntoDB = async (productId: string, payload: TFlashSale) => {
  const isProductExist = await Product_model.findOne({ productId });

  if (!isProductExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This product is not found!!!');
  }

  const result = await Product_model.findOneAndUpdate({ productId }, payload, {
    new: true,
  });

  return result;
};

const getAllFlashSaleProducts = async () => {
  const now = new Date();
  const result = Product_model.find({
    flashSale: {
      $exists: true,
    },
    'flashSale.flashSaleStartDate': { $lte: now },
    'flashSale.flashSaleEndDate': { $gte: now },
  });
  return result;
};

export const product_services = {
  create_product_into_DB,
  get_all_products_from_DB,
  get_single_products_from_DB,
  addToFlashSaleIntoDB,
  getAllFlashSaleProducts,
};
