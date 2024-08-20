import express from "express";
import Routes from "./routes";
import { swaggerUi, specs } from "./config/swagger";
import sequelize from "./config/database";
import InitMiddleware from "./middleware";


// Common Configuration
const app = express();

// Middleware
InitMiddleware(app);

// Routes Configuration
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));  // Route Swagger UI
Routes(app);


// Test connection to DB
(async () => {
    await sequelize.authenticate()
        .then(() => console.log("Connection to Database successfully."))
        .catch(error => console.log("Unable to connect to DB:", error))
})()



export default app;

