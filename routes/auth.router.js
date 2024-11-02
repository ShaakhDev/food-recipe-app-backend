const express = require("express");
const { RegisterUser, Login } = require("../controller/user.controller");

const router = express.Router();
/** POST Methods */
/**
 * @openapi
 * '/auth/sign-up':
 *  post:
 *     tags:
 *     - Auth API
 *     summary: Register new user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *      201:
 *        description: OK
 *      400:
 *       description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.post("/sign-up", RegisterUser);
/**
 * @openapi
 * '/auth/sign-in':
 *  post:
 *     tags:
 *     - Auth API
 *     summary: Login user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 default: "shohbobolov98@gmail.com"
 *               password:
 *                 type: string
 *                 default: "12345678"
 *     responses:
 *      201:
 *        description: OK
 *      400:
 *       description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.post("/sign-in", Login);

module.exports = router;
