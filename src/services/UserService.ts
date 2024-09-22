import dotenv from "dotenv";
import User from "../models/User";
import { UserInterface } from "../interfaces/models/UserInterface";
dotenv.config();


class UserService {

    /**
     * Hàm lấy thông tin user bởi user name
     * @param userName 
     * @returns 
     */
    public async get(userName: string): Promise<any> {
        try {

            const user = await User.findOne({
                where: { userName: userName },
                attributes: { exclude: ['password'] }
            })

            return user;

        } catch (error) {
            console.log(error);
            return null;
        }
    }

    /**
     * Hàm lấy thông tin user bởi email
     * @param email 
     * @returns 
     */
    public async getUserByEmail(email: string): Promise<any> {
        try {

            const user = await User.findOne({
                where: { email: email },
            })

            return user;

        } catch (error) {
            console.log(error);
            return null;
        }
    }

    /**
     * Hàm lấy danh sách toàn bộ user
     * @returns 
     */
    public async getAll(): Promise<any> {
        try {

            const users = await User.findAll({
                attributes: { exclude: ['password'] }
            });

            return users;

        } catch (error) {
            console.log(error);
            return [];
        }
    }

    /**
     * Hàm update user
     * @param values Object các key của bảng user cần update
     * @param conditions Điều kiện update
     * @returns 
     */
    public async update(values: UserInterface, conditions: UserInterface): Promise<any> {
        try {

            const rowsUpdated = await User.update(
                values,
                {
                    where: {
                        ...conditions,
                    }
                }
            )

            return rowsUpdated;

        } catch (error) {
            console.log(error);
            return null
        }
    }


}



export default new UserService;
