const express = require("express");
const { RegisterUser, Login, GetUser, UpdateUser, DeleteUser } = require("../controller/user.controller");
const { protect } = require("../middleware/auth.middleware");

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

router.get("/user", (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  // find user from db and if it exists send user data to client
  // if user is not found send 404 status code and message user not found
});

router.get("/profile", protect, GetUser);
router.put("/profile", protect, UpdateUser);
router.delete("/profile", protect, DeleteUser);

module.exports = router;
