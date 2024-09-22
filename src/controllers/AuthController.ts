import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";
import Random from "../helpers/Random";


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

            const user = await AuthService.login(userName, password);

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
     * API gửi code cho user qua email khi user quên mật khẩu
     * @param req 
     * @param res 
     * @returns 
     */
    public async forgotPasswordSendCode(req: Request, res: Response): Promise<Response> {
        try {

            const { email } = req.body;

            const user = await UserService.getUserByEmail(email);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User is not exist!"
                })
            }

            // Tạo ngẫu nhiên mã code 6 chữ số
            const code = Random.generateRandomNumber(6);
            const codeExpiredAt = new Date((new Date).getTime() + (60000 * 60));    // Lấy thời gian trước 1 tiếng vì code chỉ có thời hạn trong 1 tiếng

            // Update code và codeExpiredAt vào DB
            const userUpdated = await UserService.update({ code, codeExpiredAt }, { id: user.id });
            console.log(userUpdated);
            if (!userUpdated) {
                return res.status(500).json({
                    success: false,
                    message: "Something was wrong!. Please try agian"
                })
            }

            // Gửi mail
            const sendMailIsSuccess = await AuthService.sendEmail(
                email as string
                , "TypeScript API Template"
                , ""
                , `
                    <strong>Xác minh việc khôi phục lại mật khẩu</strong>
                    <p>Sử dụng mã này để hoàn tất việc khôi phục lại mật khẩu của bạn: </p>
                    <b>&emsp;${code}</b>
                    <br><br>
                    <p>Mã này sẽ hết hạn sau 1 tiếng</p>
                    <br>
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
                message: "Email has been sent to your email address, please check it!",
                email: email
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Server Error" });
        }
    }

    /**
     * API đối chiếu code gửi cho user khi user quên mật khẩu qua email và code được lưu trong DB
     * @param req 
     * @param res 
     * @returns 
     */
    public async forgotPasswordVerifyCode(req: Request, res: Response): Promise<Response> {
        try {

            const { email, code } = req.body;

            const verifyCode = await AuthService.verifyCodeForgotPassword(email, code);

            if (verifyCode.isExpired || verifyCode.isValidCode) {
                return res.status(400).json({
                    success: false,
                    message: (verifyCode.isExpired) ? "Code is expired!" : "Code is not correct!"
                });
            }

            return res.status(200).json({
                success: true,
                email: email,
                message: "Verify code is success!"
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Server Error" });
        }
    }


}



export default new AuthController;
