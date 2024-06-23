import { SubCategory } from "./subCategory.model"

export const generatSubCategoryId = async () => {
    let currentId = '0'

    const lastSubCategoryId = await SubCategory.findOne({}, { subCategoryId: 1 }).sort({
        createdAt: -1,
    })
    if (lastSubCategoryId) {
        currentId = lastSubCategoryId.subCategoryId.substring(3)
    }
    return (Number(currentId) + 1).toString().padStart(4, '0')
}