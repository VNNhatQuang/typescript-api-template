import { Request, Response } from "express";
import UserService from "../services/UserService";


class UserController {

    /**
     * API lấy thông tin user bởi userName
     * @param req 
     * @param res 
     * @returns 
     */
    public async show(req: Request, res: Response): Promise<Response> {
        try {

            const { userName } = req.params;

            const user = await UserService.get(userName);

            return res.status(200).json({
                success: true,
                message: "Get infomation of user by userName",
                data: user
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Server Error" });
        }
    }

    /**
     * API trả về danh sách toàn bộ user
     * @param req 
     * @param res 
     * @returns 
     */
    public async showAll(req: Request, res: Response): Promise<Response> {
        try {

            const data = await UserService.getAll();

            return res.status(200).json({
                success: true,
                message: "List of all users",
                data: data
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Server Error" });
        }
    }


}



export default new UserController;
