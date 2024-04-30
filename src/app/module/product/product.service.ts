import { Product_model } from "../product/product.model";
import { TProduct } from "./product.interface";

const create_product_into_DB = async (product: TProduct) => {
    const result = await Product_model.create(product)
    return result
}

const get_all_products_from_DB = async () => {
    const result = await Product_model.find()
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