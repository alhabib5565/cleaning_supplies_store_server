import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { MainCategory } from '../mainCategory/mainCategory.model';
import { TCategory } from './category.interface';
import { Category } from './category.model';
import { generateCategoryId } from './utils';
import { QueryBuilder } from '../../builder/QueryBuilder';
import { Product_model } from '../product/product.model';

const create_category_into_DB = async (payload: TCategory) => {
  const mainCategory = await MainCategory.findById(payload.mainCategory);

  if (!mainCategory) {
    throw new AppError(httpStatus.NOT_FOUND, 'Main category does not exist');
  }

  payload._id = payload.categoryName.split(' ').join('-').toLowerCase();

  payload.categoryId =
    payload.categoryName.split('').slice(0, 2).join('').toUpperCase() +
    '-' +
    (await generateCategoryId());

  const result = await Category.create(payload);
  return result;
};

const get_all_category_from_DB = async (query: Record<string, unknown>) => {
  const searchAbleFields = [
    'mainCategory',
    'categoryName',
    'metaTitle',
    'metaDescription',
  ];

  const modelQuery = new QueryBuilder(
    query,
    Category.find().populate('mainCategory'),
  )
    .search(searchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await modelQuery.countTotal();
  const result = await modelQuery.modelQuery;
  return {
    result,
    meta,
  };
};

const get_single_category_from_DB = async (id: string) => {
  const result = await Category.findById(id).populate('mainCategory');
  return result;
};

const getTopCategories = async () => {
  const result = await Product_model.aggregate([
    {
      $group: {
        _id: '$category',
        productCount: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: 'categories',
        foreignField: '_id',
        localField: '_id',
        as: 'category',
      },
    },

    {
      $sort: { productCount: -1 },
    },
    {
      $limit: 12,
    },
    {
      $unwind: '$category',
    },
    {
      $project: {
        imageURL: '$category.imageURL',
        categoryName: '$category.categoryName',
      },
    },
  ]);

  return result;
};

export const category_services = {
  create_category_into_DB,
  get_all_category_from_DB,
  get_single_category_from_DB,
  getTopCategories,
};
