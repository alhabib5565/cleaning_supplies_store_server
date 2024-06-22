import { Category } from "./category.model"

export const generateMainCategoryId = async () => {
    let currentId = '0'

    const lastMainCategoryId = await Category.findOne({}, { mainCategoryId: 1 }).sort({
        createdAt: -1,
    })
    if (lastMainCategoryId) {
        currentId = lastMainCategoryId.categoryId.substring(3)
    }
    return (Number(currentId) + 1).toString().padStart(4, '0')
}