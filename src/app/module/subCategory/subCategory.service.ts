import httpStatus from "http-status"
import AppError from "../../error/AppError"
import { MainCategory } from "../mainCategory/mainCategory.model"
import { TSubCategory } from "./subCategory.interface"
import { SubCategory } from "./subCategory.model"
import { Category } from "../category/category.model"
import { generatSubCategoryId } from "./utils"



const createSubCategoryIntoDB = async (payload: TSubCategory) => {
    const mainCategory = await MainCategory.findById(payload.mainCategory)
    if (!mainCategory) {
        throw new AppError(httpStatus.NOT_FOUND, 'Main category does not exist')
    }

    const category = await Category.findById(payload.category)
    if (!category) {
        throw new AppError(httpStatus.NOT_FOUND, 'Category does not exist')
    }

    payload._id = payload.subCategoryName.split(' ').join('-').toLowerCase()
    payload.subCategoryId = payload.subCategoryName.split('').slice(0, 2).join('').toUpperCase() + '-' + await generatSubCategoryId()
    const result = await SubCategory.create(payload)
    return result
}

const getAllSubCategoryFromDB = async () => {
    const result = await SubCategory.find().populate('mainCategory').populate('category')
    return result
}
const getSingleSubCategoryFromDB = async (id: string) => {
    const result = await SubCategory.findOne({ _id: id })
    return result
}
export const SubCategoryService = {
    createSubCategoryIntoDB,
    getAllSubCategoryFromDB,
    getSingleSubCategoryFromDB
}