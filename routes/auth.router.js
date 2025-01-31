const express = require("express");
const {
  RegisterUser,
  Login,
  GetUser,
  UpdateUser,
  DeleteUser,
} = require("../controller/user.controller");
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

/**
 * @openapi
 * /auth/profile:
 *   get:
 *     tags:
 *     - Auth API
 *     summary: Get user profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "507f1f77bcf86cd799439011"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "john@example.com"
 *                     image:
 *                       type: string
 *                       example: "profile_image_url"
 *                     profession:
 *                       type: string
 *                       example: "Software Developer"
 *                     bio:
 *                       type: string
 *                       example: "A passionate developer"
 *                     location:
 *                       type: string
 *                       example: "New York, USA"
 *                     followers:
 *                       type: number
 *                       example: 100
 *                     following:
 *                       type: number
 *                       example: 50
 *                     isAdmin:
 *                       type: boolean
 *                       example: false
 *       401:
 *         description: Not authorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 *   put:
 *     tags:
 *     - Auth API
 *     summary: Update user profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               image:
 *                 type: string
 *                 example: "profile_image_url"
 *               profession:
 *                 type: string
 *                 example: "Software Developer"
 *               bio:
 *                 type: string
 *                 example: "A passionate developer"
 *               location:
 *                 type: string
 *                 example: "New York, USA"
 *               followers:
 *                 type: number
 *                 example: 100
 *               following:
 *                 type: number
 *                 example: 50
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     image:
 *                       type: string
 *                     profession:
 *                       type: string
 *                     bio:
 *                       type: string
 *                     location:
 *                       type: string
 *                     followers:
 *                       type: number
 *                     following:
 *                       type: number
 *                     isAdmin:
 *                       type: boolean
 *       401:
 *         description: Not authorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 *   delete:
 *     tags:
 *     - Auth API
 *     summary: Delete user profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User profile deleted successfully"
 *       401:
 *         description: Not authorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

router.get("/profile", protect, GetUser);
router.put("/profile", protect, UpdateUser);
router.delete("/profile", protect, DeleteUser);

module.exports = router;
