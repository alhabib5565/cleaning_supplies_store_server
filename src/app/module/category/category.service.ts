import { TCategory } from "./category.interface";
import { Category_model } from "./category.model";

const create_category_into_DB = async (category: TCategory) => {
    const result = await Category_model.create(category)
    return result
}

const get_all_category_from_DB = async () => {
    const result = await Category_model.find()
    return result
}
const get_single_category_from_DB = async (id: string) => {
    const result = await Category_model.findOne({ _id: id })
    return result
}
export const category_services = {
    create_category_into_DB,
    get_all_category_from_DB,
    get_single_category_from_DB
}