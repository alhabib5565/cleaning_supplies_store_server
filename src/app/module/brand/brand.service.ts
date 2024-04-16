import { TBrand } from "./brand.interface";
import { Brand_model } from "./brand.model";


const create_brand_into_DB = async (brand: TBrand) => {
    const result = await Brand_model.create(brand)
    return result
}

export const brand_service = {
    create_brand_into_DB
}