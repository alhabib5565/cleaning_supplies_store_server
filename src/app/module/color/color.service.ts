import { TColor } from "./color.interface";
import { Color } from "./color.model";

const createColorIntoDB = async (payload: TColor) => {
    const result = await Color.create(payload)
    return result
}

const getAllColorFromDB = async () => {
    const result = await Color.find()
    return result
}

const getSingleColorFromDB = async (id: string) => {
    const result = await Color.findById(id)
    return result
}

export const ColorService = {
    createColorIntoDB,
    getAllColorFromDB,
    getSingleColorFromDB
}