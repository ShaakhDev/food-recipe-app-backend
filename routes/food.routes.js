const express = require("express");
const {
  addFood,
  addToCart,
  createOrder,
  getAllFoods,
  getFoodById,
  addMultipleFoods,
  getUserCart,
  getOrderHistory,
} = require("../controller/food.controller");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @openapi
 * '/foods':
 *  get:
 *     tags:
 *     - Food API
 *     summary: Get all available foods
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   image:
 *                     type: string
 *                   price:
 *                     type: number
 *                   timeToDelivery:
 *                     type: number
 *                   availableCount:
 *                     type: number
 *       500:
 *         description: Server Error
 */
router.get("/foods", getAllFoods);

/**
 * @openapi
 * '/food/{id}':
 *  get:
 *     tags:
 *     - Food API
 *     summary: Get food by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Food ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 image:
 *                   type: string
 *                 price:
 *                   type: number
 *                 timeToDelivery:
 *                   type: number
 *                 availableCount:
 *                   type: number
 *       404:
 *         description: Food not found
 *       500:
 *         description: Server Error
 */
router.get("/food/:id", getFoodById);

/**
 * @openapi
 * '/add-food':
 *  post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *     - Food API
 *     summary: Add new food (Admin only)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - image
 *               - price
 *               - timeToDelivery
 *               - availableCount
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *               price:
 *                 type: number
 *               timeToDelivery:
 *                 type: number
 *               availableCount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Food created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not admin
 *       500:
 *         description: Server Error
 */
router.post("/add-food", verifyToken, verifyAdmin, addFood);

/**
 * @openapi
 * '/add-foods':
 *  post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *     - Food API
 *     summary: Add multiple foods at once (Admin only)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - foods
 *             properties:
 *               foods:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - name
 *                     - description
 *                     - image
 *                     - price
 *                     - timeToDelivery
 *                     - availableCount
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Chicken Burger"
 *                     description:
 *                       type: string
 *                       example: "Delicious chicken burger with special sauce"
 *                     image:
 *                       type: string
 *                       example: "https://example.com/images/chicken-burger.jpg"
 *                     price:
 *                       type: number
 *                       example: 9.99
 *                     timeToDelivery:
 *                       type: number
 *                       example: 30
 *                     availableCount:
 *                       type: number
 *                       example: 50
 *     responses:
 *       201:
 *         description: Foods created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successfully added 3 foods"
 *                 foods:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       image:
 *                         type: string
 *                       price:
 *                         type: number
 *                       timeToDelivery:
 *                         type: number
 *                       availableCount:
 *                         type: number
 *       400:
 *         description: Bad request - Invalid input data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not admin
 *       500:
 *         description: Server Error
 */
router.post("/add-foods", verifyToken, verifyAdmin, addMultipleFoods);

/**
 * @openapi
 * '/add-cart':
 *  post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *     - Food API
 *     summary: Add food to cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - foodId
 *               - quantity
 *             properties:
 *               foodId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Added to cart successfully
 *       400:
 *         description: Bad request or not enough stock
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Food not found
 *       500:
 *         description: Server Error
 */
router.post("/add-cart", verifyToken, addToCart);

/**
 * @openapi
 * '/cart':
 *  get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *     - Food API
 *     summary: Get user's cart
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       foodId:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           description:
 *                             type: string
 *                           image:
 *                             type: string
 *                           price:
 *                             type: number
 *                           timeToDelivery:
 *                             type: number
 *                           availableCount:
 *                             type: number
 *                       quantity:
 *                         type: number
 *                 totalItems:
 *                   type: number
 *                   description: Total number of items in cart
 *                 totalAmount:
 *                   type: number
 *                   description: Total price of all items in cart
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Server Error
 */
router.get("/cart", verifyToken, getUserCart);

/**
 * @openapi
 * '/order':
 *  post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *     - Food API
 *     summary: Create order from cart
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       foodId:
 *                         type: string
 *                       quantity:
 *                         type: number
 *                       price:
 *                         type: number
 *                 totalAmount:
 *                   type: number
 *                 status:
 *                   type: string
 *                   enum: [pending, processing, delivered, cancelled]
 *                 deliveryTime:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Bad request or empty cart
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Food not found
 *       500:
 *         description: Server Error
 */
router.post("/order", verifyToken, createOrder);

/**
 * @openapi
 * '/orders':
 *  get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *     - Food API
 *     summary: Get user's order history
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, processing, delivered, cancelled]
 *         description: Filter orders by status
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 10
 *         description: Number of orders per page
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       items:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             foodId:
 *                               type: object
 *                               properties:
 *                                 name:
 *                                   type: string
 *                                 description:
 *                                   type: string
 *                                 image:
 *                                   type: string
 *                                 price:
 *                                   type: number
 *                             quantity:
 *                               type: number
 *                             price:
 *                               type: number
 *                       totalAmount:
 *                         type: number
 *                       status:
 *                         type: string
 *                         enum: [pending, processing, delivered, cancelled]
 *                       deliveryTime:
 *                         type: string
 *                         format: date-time
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     totalOrders:
 *                       type: integer
 *                     hasNextPage:
 *                       type: boolean
 *                     hasPrevPage:
 *                       type: boolean
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Server Error
 */
router.get("/orders", verifyToken, getOrderHistory);

module.exports = router;
