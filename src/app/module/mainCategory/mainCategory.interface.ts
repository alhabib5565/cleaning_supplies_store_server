import { TStatus } from "../../interface/golobal"

export type TMainCategory = {
    _id: string
    mainCategoryId: string
    mainCategoryName: string
    imageURL: string,
    metaTitle: string
    metaDescription: string
    status: TStatus
    isDeleted: boolean
}