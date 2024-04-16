import { Request, Response } from "express"
import { category_services } from "./category.service"


const create_category = async (req: Request, res: Response) => {
    try {
        const category = req.body
        const result = await category_services.create_category_into_DB(category)

        res.status(200).json({
            success: true,
            message: 'category create succesfull',
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'category create failed',
            error
        })
    }

}

export const category_controller = {
    create_category
}