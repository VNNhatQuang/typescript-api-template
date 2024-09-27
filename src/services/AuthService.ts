import dotenv from "dotenv";
import User from "../models/User";
import jwt from "jsonwebtoken";
import mailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";
import UserService from "./UserService";
dotenv.config();


class AuthService {

    /**
     * Hàm thực hiện chức năng đăng nhập và tạo token cho user
     * @param userName 
     * @param password 
     * @returns 
     */
    public async login(userName: string, password: string): Promise<any> {
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
            const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY as string, { expiresIn: '3h' });

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

    /**
     * Hàm gửi email về cho user
     * @param email 
     * @param subject 
     * @param text 
     * @param html 
     * @returns 
     */
    public async sendEmail(email: string, subject: string, text: string, html: string | undefined = undefined): Promise<any> {
        try {

            // Cấu hình transporter
            const transporter = mailer.createTransport({
                service: "gmail",
                // host: "smtp.ethereal.email",
                // port: 587,
                // secure: false, // true for port 465, false for other ports
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });

            // Cấu hình thông tin email
            const mailOptions: MailOptions = {
                from: process.env.EMAIL,    // Địa chỉ gửi email
                to: email,  // Địa chỉ nhận email
                subject: subject,   // Tiêu đề email
                text: text, // Nội dung email dạng text
                html: html, // Nội dung email dạng HTML (nếu muốn)
            };

            // Gửi email
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log('Có lỗi xảy ra:', error);
                } else {
                    // console.log(info);
                }
            });


            return true;

        } catch (error) {
            console.log(error);
            return false;
        }
    }

    /**
     * Hàm xác nhận code quên mật khẩu có đúng không và thời gian hết hạn của code đó
     * khi người dùng nhập code để đổi mật khẩu
     * @param email 
     * @param code 
     * @returns 
     */
    public async verifyCodeForgotPassword(email: string, code: number): Promise<{ isExistUser: boolean, isValidCode: boolean, isNotExpired: boolean }> {
        const data: { isExistUser: boolean, isValidCode: boolean, isNotExpired: boolean } = {
            isExistUser: true,
            isValidCode: true,
            isNotExpired: true,
        }

        try {

            const user = await UserService.getUserByEmail(email);
            // Check email có tồn tại không
            if (!user) {
                data.isExistUser = false;
                return data;
            }

            const codeExpiredAt = new Date(`${user.codeExpiredAt}`);
            const now = new Date();

            // Check thời gian code đã hết hạn chưa
            if (codeExpiredAt.getTime() < now.getTime()) {
                data.isNotExpired = false;
                return data;
            }
            // Check mã code có chính xác hay không
            if (user.code != code) {
                data.isValidCode = false;
                return data;
            }


            return data;

        } catch (error) {
            console.log(error);
            return {
                isExistUser: false,
                isValidCode: false,
                isNotExpired: false,
            };
        }
    }

    /**
     * Hàm đặt lại mật khẩu sau khi verify code thành công
     * Coi code như là 1 token (không cần check expired time)
     * @param email 
     * @param code 
     * @param newPassword 
     * @param newPasswordConfirm 
     * @returns 
     */
    public async resetPassword(email: string, code: number, newPassword: string, newPasswordConfirm: string): Promise<{ isExistUser: boolean, isEqualCode: boolean, isEqualPassword: boolean, isChangedPassword: boolean }> {
        const data = {
            isExistUser: true,
            isEqualCode: true,
            isEqualPassword: true,
            isChangedPassword: true
        }

        try {

            // Check
            const user = await UserService.getUserByEmail(email);
            if (!user) {
                data.isExistUser = false;
                return data;
            }
            if (user.code != code) {
                data.isEqualCode = false;
                return data;
            }
            if (newPassword !== newPasswordConfirm) {
                data.isEqualPassword = false;
                return data;
            }

            // Reset password
            const userResetPassword = await UserService.update(
                { password: newPassword },
                { email: email }
            )
            if (!userResetPassword) {
                data.isChangedPassword = false;
                return data;
            }


            return data;

        } catch (error) {
            console.log(error);
            return {
                isExistUser: false,
                isEqualCode: false,
                isEqualPassword: false,
                isChangedPassword: false
            };
        }
    }


}



export default new AuthService;
