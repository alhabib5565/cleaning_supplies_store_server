import { QueryBuilder } from "../../builder/QueryBuilder"
import { TCategory } from "../category/category.interface";
import { TSubCategory } from "../subCategory/subCategory.interface";
import { TMainCategory } from "./mainCategory.interface"
import { MainCategory } from "./mainCategory.model"
import { generateMainCategoryId } from "./utils"


const createMainCategoryIntoDB = async (payload: TMainCategory) => {
    payload._id = payload.mainCategoryName.split(' ').join('-').toLowerCase()
    payload.mainCategoryId = payload.mainCategoryName.split('').slice(0, 2).join('').toUpperCase() + '-' + await generateMainCategoryId()
    const result = await MainCategory.create(payload)
    return result
}

const getAllMainCategoryFromDB = async (query: Record<string, unknown>) => {
    const searchAbleFields = ['mainCategoryName', 'metaTitle', 'metaDescription']

    const modelQuery = new QueryBuilder(query, MainCategory.find())
        .search(searchAbleFields)
        .filter()
        .sort()
        .paginate()
        .fields()

    const result = await modelQuery.modelQuery
    return result
}
const getCategoriesForDropdown = async () => {
    const categories = await MainCategory.aggregate([
        {
            $lookup: {
                from: 'categories',
                localField: '_id',
                foreignField: 'mainCategory',
                as: 'categories'
            }
        },
        {
            $unwind: {
                path: '$categories',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: 'subcategories',
                localField: 'categories._id',
                foreignField: 'category',
                as: 'categories.subCategories'
            }
        },

        {
            $group: {
                _id: "$_id",
                mainCategoryName: { $first: '$mainCategoryName' },
                imageURL: { $first: '$imageURL' },
                categories: { $push: '$categories' },
            }
        },
    ]);

    const result = categories.map((mainCategoy: TMainCategory & { categories: TCategory[] }) => ({
        _id: mainCategoy._id,
        mainCategoryName: mainCategoy.mainCategoryName,
        imageURL: mainCategoy.imageURL,
        categories: mainCategoy.categories?.map((
            category: TCategory & {
                subCategories?: TSubCategory[]
            }) => ({
                _id: category._id,
                categoryName: category.categoryName,
                imageURL: category.imageURL,
                subCategories: category.subCategories?.map((subCategory: TSubCategory) => ({
                    _id: subCategory._id,
                    categoryName: subCategory.subCategoryName,
                    imageURL: subCategory.imageURL,
                }))
            }))
    }))

    return result
}
const getSingleMainCategoryFromDB = async (id: string) => {
    const result = await MainCategory.findOne({ _id: id })
    return result
}
export const MainCategoryService = {
    createMainCategoryIntoDB,
    getAllMainCategoryFromDB,
    getCategoriesForDropdown,
    getSingleMainCategoryFromDB
}