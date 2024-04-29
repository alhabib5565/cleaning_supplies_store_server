/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    res.status(500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        erròr: err
    })
}