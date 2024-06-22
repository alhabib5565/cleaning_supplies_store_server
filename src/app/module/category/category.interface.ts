import { TStatus } from "../../interface/golobal"

export type TCategory = {
    _id: string
    categoryId: string
    mainCategoryName: string
    categoryName: string
    imageURL: string,
    metaTitle: string
    metaDescription: string
    status: TStatus
    isDeleted: boolean
}