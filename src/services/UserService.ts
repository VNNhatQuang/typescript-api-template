import User from "../models/User";
import jwt from "jsonwebtoken";


class UserService {

    /**
     * Hàm thực hiện chức năng đăng nhập và tạo token cho user
     * @param userName 
     * @param password 
     * @returns 
     */
    public async login(userName: string, password: string): Promise<any | null> {
        try {

            const user = await User.findOne({ where: { userName: userName } });
            if (!user) {
                return {
                    loginStatus: false,
                    message: "The userName is wrong or doesn't exist"
                };
            }

            // So sánh password
            if (!(password === user.password)) {
                return {
                    loginStatus: false,
                    message: "The password isn't correct"
                };
            }

            // Tạo token
            const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY as string, { expiresIn: '1h' });

            return {
                token: token,
                userName: user.userName,
                email: user.email,
                phoneNumber: user.phoneNumber
            };

        } catch (error) {
            console.log(error);
            return null;
        }
    }





}



export default new UserService;
