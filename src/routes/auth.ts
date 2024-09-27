import express, { Router } from 'express';
import AuthController from '../controllers/AuthController';
import Validate from '../middleware/Validate';
import LoginValidator from '../validators/auth/LoginValidator';
import { SendCodeValidator, VerifyCodeValidator, ResetPassword } from '../validators/auth/ForgotPasswordValidator';

const auth: Router = express.Router();


/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: Authetication Functions
 */

/** Thực hiện đăng nhập
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     description: API for function user login
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 description: The user name
 *                 default: ""
 *               password:
 *                 type: string
 *                 description: The password user
 *                 default: ""
 *             required:
 *               - userName
 *               - password
 *     responses:
 *       200:
 *         description: A list of test items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
auth.post("/login", Validate(LoginValidator), AuthController.login);

/** Gửi code về cho user khi quên mật khẩu để đổi password
 * @swagger
 * /api/auth/forgot-password/send-code:
 *   post:
 *     summary: Send auth code when user forgot password
 *     tags: [Authentication]
 *     description: API send auth code when user forgot password
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email user
 *                 default: ""
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
auth.post("/forgot-password/send-code", Validate(SendCodeValidator), AuthController.forgotPasswordSendCode);

/** Xác nhận code đổi mật khẩu có đúng hay không
 * @swagger
 * /api/auth/forgot-password/verify-code:
 *   post:
 *     summary: Verify auth code change password
 *     tags: [Authentication]
 *     description: API for function verify auth code change password
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email user
 *                 default: ""
 *               code:
 *                 type: number
 *                 description: The auth code has been sent via user email when the user forgets the password
 *                 default: ""
 *             required:
 *               - email
 *               - code
 *     responses:
 *       200:
 *         description: 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
auth.post("/forgot-password/verify-code", Validate(VerifyCodeValidator), AuthController.forgotPasswordVerifyCode);

/** Đổi mật khẩu sau khi đã verify code thành công
 * @swagger
 * /api/auth/forgot-password/reset-password:
 *   post:
 *     summary: Change password when verify code is success
 *     tags: [Authentication]
 *     description: API for function change password
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email user
 *                 default: ""
 *               code:
 *                 type: string
 *                 description: The auth code has been sent via user email in previous step (may be has expired)
 *                 default: ""
 *               newPassword:
 *                 type: string
 *                 description: New password
 *                 default: ""
 *               newPasswordConfirm:
 *                 type: string
 *                 description: Confirm new password again
 *                 default: ""
 *             required:
 *               - email
 *               - code
 *               - newPassword
 *               - newPasswordConfirm
 *     responses:
 *       200:
 *         description: 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
auth.post("/forgot-password/reset-password", Validate(ResetPassword), AuthController.forgotPasswordResetPassword)



export default auth;
