import express from "express";
import dotenv from "dotenv";
import Routes from "./routes";
import { swaggerUi, specs } from "./config/swagger";
import cors from "cors";
import sequelize from "./config/database";


// Common Configuration
dotenv.config();
const app = express();
app.use(express.json());    // Middleware handle data JSON
app.use(express.urlencoded({ extended: true }));    // Middleware handle data from form (application/x-www-form-urlencoded)
app.use(cors({ origin: false }));   // Turn down CORS


// Routes Configuration
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));  // Route Swagger UI
Routes(app);


// Default host and port
const PORT = process.env.PORT || 3000;
const HOST_NAME = process.env.HOST_NAME || "localhost";



// App running
app.listen(PORT, () => {
    console.log(`API is running:\t http://${HOST_NAME}:${PORT}/api-docs`);
});
