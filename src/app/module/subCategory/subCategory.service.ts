import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { MainCategory } from '../mainCategory/mainCategory.model';
import { TSubCategory } from './subCategory.interface';
import { SubCategory } from './subCategory.model';
import { Category } from '../category/category.model';
import { generatSubCategoryId } from './utils';
import { QueryBuilder } from '../../builder/QueryBuilder';

const createSubCategoryIntoDB = async (payload: TSubCategory) => {
  const mainCategory = await MainCategory.findById(payload.mainCategory);
  if (!mainCategory) {
    throw new AppError(httpStatus.NOT_FOUND, 'Main category does not exist');
  }

  const category = await Category.findById(payload.category);
  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category does not exist');
  }

  payload._id = payload.subCategoryName.split(' ').join('-').toLowerCase();
  payload.subCategoryId =
    payload.subCategoryName.split('').slice(0, 2).join('').toUpperCase() +
    '-' +
    (await generatSubCategoryId());
  const result = await SubCategory.create(payload);
  return result;
};

const getAllSubCategoryFromDB = async (query: Record<string, unknown>) => {
  const searchAbleFields = [
    'mainCategory',
    'category',
    'subCategoryName',
    'metaTitle',
    'metaDescription',
  ];

  const modelQuery = new QueryBuilder(
    query,
    SubCategory.find().populate('mainCategory').populate('category'),
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
const getSingleSubCategoryFromDB = async (id: string) => {
  const result = await SubCategory.findOne({ _id: id });
  return result;
};
export const SubCategoryService = {
  createSubCategoryIntoDB,
  getAllSubCategoryFromDB,
  getSingleSubCategoryFromDB,
};
