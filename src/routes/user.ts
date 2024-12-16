import express, { Router } from 'express';
import UserController from '../controllers/UserController';
import Authenticate from '../middleware/Authenticate';
import Validate from '../middleware/Validate';

const user: Router = express.Router();


/**
 * @swagger
 * tags:
 *   - name: User
 *     description: User Functions
 */


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
user.get("/all", Authenticate, UserController.showAll);

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
user.get("/:userName", Authenticate, UserController.show);





export default user;
