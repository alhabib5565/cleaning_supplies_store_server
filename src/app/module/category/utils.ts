import { Category } from "./category.model"

export const generateCategoryId = async () => {
    let currentId = '0'

    const lastCategoryId = await Category.findOne({}, { categoryId: 1 }).sort({
        createdAt: -1,
    })
    if (lastCategoryId) {
        currentId = lastCategoryId.categoryId.substring(3)
    }
    return (Number(currentId) + 1).toString().padStart(4, '0')
}