import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';


const Validate = (schema: Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // Gộp tất cả các loại dữ liệu cần validate từ body, query, và params
        const dataToValidate = {
            ...req.body,   // Dữ liệu từ body (POST, PUT, PATCH)
            ...req.query,  // Dữ liệu từ query (GET)
            ...req.params  // Dữ liệu từ params (route params)
        };

        const { error } = schema.validate(dataToValidate, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                success: false,
                ...error.details[0]
            });
        }

        next();
    };
};



export default Validate;
