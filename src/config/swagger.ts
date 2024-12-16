import swaggerJsdoc, { Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
dotenv.config();


// Swagger Configuration
const options: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Kingbets365',
            version: '1.0.0',
            description: 'APIs for Kingbets365',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    // Path to files contain JSDoc comments
    apis: ['./src/routes/*.ts'],
};


const specs = swaggerJsdoc(options);



export { swaggerUi, specs };
