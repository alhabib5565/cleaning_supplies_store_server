import { TBrand } from "./brand.interface";
import { Brand_model } from "./brand.model";


const create_brand_into_DB = async (brand: TBrand) => {
    const result = await Brand_model.create(brand)
    return result
}
const get_all_brand_from_DB = async () => {
    const result = await Brand_model.find()
    return result
}
const get_single_brand_from_DB = async (id: string) => {
    const result = await Brand_model.findOne({ _id: id })
    return result
}

export const brand_service = {
    create_brand_into_DB,
    get_all_brand_from_DB,
    get_single_brand_from_DB
}