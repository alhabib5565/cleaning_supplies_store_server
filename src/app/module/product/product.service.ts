import httpStatus from "http-status";
import { QueryBuilder } from "../../builder/QueryBuilder";
import { MainCategory } from "../mainCategory/mainCategory.model";
import { Product_model } from "../product/product.model";
import { TProduct } from "./product.interface";
import AppError from "../../error/AppError";
import { Category } from "../category/category.model";
import { SubCategory } from "../subCategory/subCategory.model";

const create_product_into_DB = async (payload: TProduct) => {
    const mainCategory = await MainCategory.findById(payload.mainCategory)
    if (!mainCategory) {
        throw new AppError(httpStatus.NOT_FOUND, 'Main category does not exist')
    }

    const category = await Category.findById(payload.category)
    if (!category) {
        throw new AppError(httpStatus.NOT_FOUND, 'Category does not exist')
    }

    const subCategory = await SubCategory.findById(payload.subCategory)
    if (!subCategory) {
        throw new AppError(httpStatus.NOT_FOUND, 'Category does not exist')
    }
    payload.availableQuantity = payload.totalQuantity

    const result = await Product_model.create(payload)
    return result
}

const get_all_products_from_DB = async (query: Record<string, unknown>) => {
    /**
     *    let searchTerm = ''
       const queryObj = { ...query }
       if (query?.searchTerm) {
           searchTerm = query.searchTerm as string
       }
       const excludeFields = ['searchTerm', 'limit', 'page', 'fields']
       console.log(query)
       excludeFields.forEach(field => delete queryObj[field])
   
       const searchAbleFields = ['title', 'brand', 'category', 'type'].map((filed) => ({
           [filed]: { $regex: searchTerm, $options: 'i' }
       }))
   
       const searchQuery = Product_model.find({
           $or: searchAbleFields
       })
   
       const filterQuery = searchQuery.find(queryObj)
   
       let limit = 0
       if (query?.limit) {
           limit = Number(query.limit)
       }
   
       const limitQuery = filterQuery.limit(limit)
   
       let skip = 0
       let page = 1
       if (query?.page) {
           page = Number(query.page)
           skip = (page - 1) * limit
       }
       const paginateQuery = limitQuery.skip(skip)
   
       let fields = '__v'
       if (query?.fields) {
           fields = (query.fields as string).split(',').join(' ')
       }
   
       const fieldQuery = await paginateQuery.select(fields)
   
     */

    const searchAbleFields = ['title', 'brand', 'category', 'type']

    const modelQuery = new QueryBuilder(query, Product_model.find())
        .search(searchAbleFields)
        .filter()
        .sort()
        .paginate()
        .fields()

    const result = await modelQuery.modelQuery
    return result

}
const get_single_products_from_DB = async (id: string) => {
    const result = await Product_model.findOne({ _id: id })
    return result
}

export const product_services = {
    create_product_into_DB,
    get_all_products_from_DB,
    get_single_products_from_DB
}