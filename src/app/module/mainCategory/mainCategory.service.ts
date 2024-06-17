import { TMainCategory } from "./mainCategory.interface"
import { MainCategory } from "./mainCategory.model"


const createMainCategoryIntoDB = async (payload: TMainCategory) => {
    payload._id = payload.mainCategoryName.split(' ').join('-').toLowerCase()
    const result = await MainCategory.create(payload)
    return result
}

const getAllMainCategoryFromDB = async () => {
    const result = await MainCategory.find()
    return result
}
const getSingleMainCategoryFromDB = async (id: string) => {
    const result = await MainCategory.findOne({ _id: id })
    return result
}
export const MainCategoryService = {
    createMainCategoryIntoDB,
    getAllMainCategoryFromDB,
    getSingleMainCategoryFromDB
}