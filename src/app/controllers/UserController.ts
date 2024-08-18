import { Request, Response } from "express";
import User from "../models/User";
import UserService from "../services/UserService";
import LoginRequest from "../requests/LoginRequest";


class UserController {

    /**
     * Thực hiện đăng nhập user
     * @param req 
     * @param res 
     * @returns Response
     */
    public async login(req: Request, res: Response): Promise<Response> {
        try {
            const { userName, password } = req.body;

            const validate = LoginRequest(req.body);

            if (!validate.passed) {
                return res.status(400).json({
                    success: false,
                    message: "Login user",
                    data: validate.data
                });
            }

            const user = await UserService.login(userName, password);

            return res.status(200).json({
                success: true,
                message: "Login",
                data: user,
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Server Error" });
        }
    }

    /**
     * Trả về danh sách toàn bộ user
     * @param req 
     * @param res 
     * @returns Response
     */
    public async showAll(req: Request, res: Response): Promise<Response> {
        try {
            const data = await User.findAll();

            return res.status(200).json({
                success: true,
                message: "List of Users",
                data: data
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Server Error" });
        }
    }
}



export default new UserController;
