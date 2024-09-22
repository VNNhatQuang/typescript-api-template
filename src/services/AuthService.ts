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
    public async verifyCodeForgotPassword(email: string, code: number): Promise<{ isValidCode: boolean, isExpired: boolean }> {
        const data = {
            isValidCode: true,
            isExpired: true,
        }

        try {

            const user = await UserService.getUserByEmail(email);

            const codeExpiredAt = new Date(`${user.codeExpiredAt}`);
            const now = new Date();


            // Check thời gian code đã hết hạn chưa
            if (codeExpiredAt.getTime() > now.getTime()) {
                data.isExpired = false;
            }
            // Check mã code có chính xác hay không
            if (user.code == code) {
                data.isValidCode = false;
            }


            return data;

        } catch (error) {
            console.log(error);
            return data;
        }
    }


}



export default new AuthService;
