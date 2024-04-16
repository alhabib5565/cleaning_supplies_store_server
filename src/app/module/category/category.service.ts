import { TCategory } from "./category.interface";
import { Category_model } from "./category.model";

const create_category_into_DB = async (category: TCategory) => {
    const result = await Category_model.create(category)
    return result
}

export const category_services = {
    create_category_into_DB
}