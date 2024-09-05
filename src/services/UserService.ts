import dotenv from "dotenv";
import User from "../models/User";
import jwt from "jsonwebtoken";
import mailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";

dotenv.config();

class UserService {

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


}



export default new UserService;
