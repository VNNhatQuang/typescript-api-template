import { Request, Response, NextFunction } from "express";


/**
 * Middleware xử lý resource không được tìm thấy
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
const NotFoundHandler = (req: Request, res: Response, next: NextFunction): Response => {
    return res.status(400).json({
        message: "Resources not found"
    });
}



export default NotFoundHandler;
