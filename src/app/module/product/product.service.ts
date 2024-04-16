import { Product_model } from "../product/product.model";
import { TProduct } from "./product.interface";

const create_product_into_DB = async (product: TProduct) => {
    const result = await Product_model.create(product)
    return result
}

export const product_services = {
    create_product_into_DB
}