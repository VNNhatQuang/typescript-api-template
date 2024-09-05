import express, { Router } from 'express';
import UserController from '../controllers/UserController';
import VerifyToken from '../middleware/VerifyToken';
import Validate from '../middleware/Validate';
import LoginValidator from '../validators/LoginValidator';

const user: Router = express.Router();


/**
 * @swagger
 * tags:
 *   - name: User
 *     description: User Functions
 */

/** Thực hiện đăng nhập user
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login user
 *     tags: [User]
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
user.post("/login", Validate(LoginValidator), UserController.login);

/** Lấy ra danh sách toàn bộ user
 * @swagger
 * /api/user/all:
 *   get:
 *     summary: Get a list of users
 *     description: Retrieve a list of all users in the system.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The user's ID
 *                   name:
 *                     type: string
 *                     description: The user's name
 *                   email:
 *                     type: string
 *                     description: The user's email
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: When the user was created
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: When the user was last updated
 */
user.get("/all", VerifyToken, UserController.showAll);

/** Lấy thông tin user dựa vào userName
 * @swagger
 * /api/user/{userName}:
 *   get:
 *     summary: Get user infomation by user name
 *     description: Get user infomation by user name
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userName
 *         required: true
 *         schema:
 *           type: string
 *         description: The user name.
 *         example: QuangVNN
 *     responses:
 *       200:
 *         description: Get infomation of user by userName
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The user's ID
 *                   name:
 *                     type: string
 *                     description: The user's name
 *                   email:
 *                     type: string
 *                     description: The user's email
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: When the user was created
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: When the user was last updated
 */
user.get("/:userName", VerifyToken, UserController.show);

/** Quên mật khẩu
 * @swagger
 * /api/user/forgot-password:
 *   post:
 *     summary: User forgot password
 *     tags: [User]
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
user.post("/forgot-password", UserController.forgotPassword);





export default user;
