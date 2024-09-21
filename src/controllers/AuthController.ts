import { Request, Response } from "express";
import UserService from "../services/UserService";


class AuthController {

    /**
     * API thực hiện đăng nhập user
     * @param req 
     * @param res 
     * @returns 
     */
    public async login(req: Request, res: Response): Promise<Response> {
        try {
            const { userName, password } = req.body;

            const user = await UserService.login(userName, password);

            return res.status(200).json({
                success: user.token ? true : false,
                message: "Login",
                data: user,
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Server Error" });
        }
    }

    /**
     * API gửi lại mật khẩu cho user qua email
     * @param req 
     * @param res 
     * @returns 
     */
    public async forgotPassword(req: Request, res: Response): Promise<Response> {
        try {

            const { email } = req.body;

            const user = await UserService.getUserByEmail(email);

            const sendMailIsSuccess = await UserService.sendEmail(
                email as string
                , "TypeScript API Template"
                , ""
                , `
                    <p>Mật khẩu của bạn: </p>
                    <b>&emsp;${user.password}</b>
                    <br><br>
                    <footer>Best Regards,<br>QuangVNN</footer>
                `
            );

            if (!sendMailIsSuccess) {

                return res.status(500).json({
                    success: false,
                    message: "Email sending failed, please try again!"
                })
            }

            return res.status(200).json({
                success: true,
                message: "Email has been sent to your email address, please check it!"
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Server Error" });
        }
    }

}



export default new AuthController;
