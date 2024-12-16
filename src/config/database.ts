import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();


class Database {
    private static instance: Database;
    private connection: Sequelize;

    public constructor() {
        // console.log("Khởi tạo object Database");
        this.connection = new Sequelize(
            process.env.DB_NAME as string
            , process.env.DB_USER as string
            , process.env.DB_PASSWORD as string
            , {
                host: process.env.DB_HOST,
                dialect: "mysql",
                logging: false, // Turn off logging
            }
        )
    }

    /**
     * Hàm get instance của lớp Database - đảm bảo chỉ 1 instance duy nhất được tạo (Singleton)
     * @returns 
     */
    public static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    /**
     * Hàm get conncetion Database với Sequelize
     * @returns 
     */
    public getconnection() {
        return this.connection;
    }

    /**
     * Hàm test kết nối với database
     */
    async testConnection() {
        await this.connection.authenticate()
            .then(() => console.log("Connection to Database successfully."))
            .catch(error => console.log("Unable to connect to DB:", error))
    }

    /**
     * Hàm đóng kết nối với database
     */
    async closeConnection() {
        await this.connection.close()
            .then(() => console.log("Database connection closed successfully."))
            .catch(error => console.error("Error while closing the database connection:", error))
    }

    
}



export default Database.getInstance();
