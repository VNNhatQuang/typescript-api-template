import express, { Router } from 'express';
import AuthController from '../controllers/AuthController';
import Validate from '../middleware/Validate';
import LoginValidator from '../validators/LoginValidator';

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

/** Quên mật khẩu
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: User forgot password
 *     tags: [Authentication]
 *     description: API for function user forgot password
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
auth.post("/forgot-password", AuthController.forgotPassword);





export default auth;
