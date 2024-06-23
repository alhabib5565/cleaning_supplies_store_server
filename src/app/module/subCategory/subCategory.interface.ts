import { TStatus } from "../../interface/golobal"

export type TSubCategory = {
    _id: string
    subCategoryId: string
    mainCategory: string, //ref
    category: string// ref
    subCategoryName: string
    imageURL: string,
    metaTitle: string
    metaDescription: string
    status: TStatus
    isDeleted: boolean
}