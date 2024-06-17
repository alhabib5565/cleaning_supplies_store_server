export type TSubCategory = {
    _id: string
    mainCategoryName: string, //ref
    categoryName: string// ref
    subCategoryName: string
    imageURL: string,
    metaTitle: string
    metaDescription: string
    isDeleted: boolean
}