import { TMainCategory } from "./mainCategory.interface"
import { MainCategory } from "./mainCategory.model"
import { generateMainCategoryId } from "./utils"


const createMainCategoryIntoDB = async (payload: TMainCategory) => {
    payload._id = payload.mainCategoryName.split(' ').join('-').toLowerCase()
    payload.mainCategoryId = payload.mainCategoryName.split('').slice(0, 2).join('').toUpperCase() + '-' + await generateMainCategoryId()
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