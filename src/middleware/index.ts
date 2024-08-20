import express, { Express } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";


/**
 * Khởi tạo các middleware chung
 * @param app 
 */
const InitMiddleware = (app: Express): void => {
    app.use(helmet());                                      // Secure Http response headers
    app.use(express.json());                                // Middleware handle data JSON
    app.use(express.urlencoded({ extended: true }));        // Middleware handle data from form (application/x-www-form-urlencoded)
    app.use(cors({ origin: false }));                       // Turn down CORS
    app.use(morgan("dev"));                                 // Logging
}



export default InitMiddleware;
