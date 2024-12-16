import express from "express";
import Routes from "./routes";
import { swaggerUi, specs } from "./config/swagger";
import Database from "./config/database";
import InitMiddleware from "./middleware";
import NotFoundHandler from "./middleware/NotFoundHandler";


// Common Configuration
const app = express();

// Middleware
InitMiddleware(app);

// Routes Configuration
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));  // Route Swagger UI
Routes(app);
app.use(NotFoundHandler);

// Test connection to DB
Database.testConnection();



export default app;
