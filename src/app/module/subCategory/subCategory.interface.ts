import { TStatus } from "../../interface/golobal"

export type TSubCategory = {
    _id: string
    subCategoryId: string
    mainCategoryName: string, //ref
    categoryName: string// ref
    subCategoryName: string
    imageURL: string,
    metaTitle: string
    metaDescription: string
    status: TStatus
    isDeleted: boolean
}