import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";


/**
 * Middleware để verify token
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
const VerifyToken = (req: Request, res: Response, next: NextFunction): Response | void => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res.status(403).json({
            success: false,
            message: "No token provided. Token is require"
        });
    }

    // Verify token
    jwt.verify(token, process.env.SECRET_KEY as string, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: "Failed to authenticate token."
            });
        }

        // Save decode in Request
        req.user = decoded;

        next();
    });
};



export default VerifyToken;
