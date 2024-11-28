const express = require("express");
const {
  GetRecipes,
  GetRecipe,
  CreateRecipe,
  UpdateRecipe,
  DeleteRecipe,
  WriteComment,
  GetNewRecipes,
} = require("../controller/recipe.controller");

const router = express.Router();
/** GET Methods */
/**
 * @openapi
 *
 * '/recipe/get-all':
 *  get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *     - Recipe API
 *     summary: Get all recipes
 *     parameters:
 *       - in: query
 *         name: category
 *         description: category name
 *         required: false
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
router.get("/recipe/get-all", GetRecipes);
/**
 * @openapi
 * '/recipe/:id':
 *  get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *     - Recipe API
 *     summary: Get recipe by id
 *     parameters:
 *       - in: path
 *         name: id
 *         description: recipe id
 *         required: true
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

router.get("/recipe/:id", GetRecipe);
/**
 * @openapi
 * '/recipe-get/new':
 *  get:
 *    security:
 *    - bearerAuth: []
 *    tags:
 *    - Recipe API
 *    summary: Get new recipes
 *    responses:
 *       201:
 *           description: OK
 *       400:
 *           description: Bad Request
 *       404:
 *           description: Not Found
 *       500:
 *           description: Server Error
 *
 */
router.get("/recipe-get/new", GetNewRecipes);
/** POST Methods */
/**
 * @openapi
 * '/recipe/create':
 *  post:
 *     security:
 *     - bearerAuth: []
 *     tags:
 *     - Recipe API
 *     summary: Create new recipe
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *           schema:
 *            type: object
 *            required:
 *              - title
 *              - description
 *              - time
 *              - ingredients
 *              - instructions
 *              - image
 *              - category
 *            properties:
 *              title:
 *                  type: string
 *                  description: title of the recipe
 *                  default: "Recipe title here"
 *              description:
 *                  type: string
 *                  description: description of the recipe
 *                  default: "This is a recipe"
 *              time:
 *                  type: string
 *                  description: time of the recipe
 *                  default: "25 min"
 *              ingredients:
 *                  type: array
 *                  description: ingredients of the recipe
 *                  items: [
 *                     { name: "ingredient name", quantity: "ingredient quantity"}
 *                  ]
 *                  default: [{ name: "ingredient name", quantity: "ingredient quantity"}]
 *              instructions:
 *                  type: array
 *                  description: instructions of the recipe
 *                  items: [
 *                    type: string
 *                  ]
 *                  default: ["Step 1: do this", "Step 2: do that"]
 *              image:
 *                  type: string
 *                  description: image of the recipe
 *              category:
 *                 type: array
 *                 description: category of the recipe
 *                 items: [
 *                   type: string
 *                 ]
 *                 default: []
 *
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
router.post("/recipe/create", CreateRecipe);
/** PUT Methods */
/**
 * @openapi
 * '/recipe/update/:id':
 *  put:
 *     security:
 *     - bearerAuth: []
 *     tags:
 *     - Recipe API
 *     summary: Update recipe by id
 *     parameters:
 *       - in: path
 *         name: id
 *         description: recipe id
 *         required: true
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *           schema:
 *            type: object
 *            properties:
 *              title:
 *                  type: string
 *                  description: title of the recipe
 *                  default: "Recipe title here"
 *              description:
 *                  type: string
 *                  description: description of the recipe
 *                  default: "This is a recipe"
 *              time:
 *                  type: string
 *                  description: time of the recipe
 *                  default: "25 min"
 *              ingredients:
 *                  type: array
 *                  description: ingredients of the recipe
 *                  items: [
 *                     { name: "ingredient name", quantity: "ingredient quantity"}
 *                  ]
 *                  default: [{ name: "ingredient name", quantity: "ingredient quantity"}]
 *              instructions:
 *                  type: array
 *                  description: instructions of the recipe
 *                  items: [
 *                    type: string
 *                  ]
 *                  default: ["Step 1: do this", "Step 2: do that"]
 *              image:
 *                  type: string
 *                  description: image of the recipe
 *              category:
 *                 type: array
 *                 description: category of the recipe
 *                 items: [
 *                   type: string
 *                 ]
 *                 default: []
 *
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
router.put("/recipe/update/:id", UpdateRecipe);
/**
 * @openapi
 * '/recipe/comment/:id':
 *  put:
 *     security:
 *     - bearerAuth: []
 *     tags:
 *     - Recipe API
 *     summary: Write comment to recipe by id
 *     parameters:
 *       - in: path
 *         name: id
 *         description: recipe id
 *         required: true
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *           schema:
 *            type: object
 *            required:
 *              - comment
 *            properties:
 *              comment:
 *                  type: string
 *                  description: comment of the recipe
 *                  default: "This is a comment"
 *
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
router.put("/recipe/comment/:id", WriteComment);

/** DELETE Methods */
/**
 * @openapi
 * '/recipe/delete/:id':
 *  delete:
 *     security:
 *     - bearerAuth: []
 *     tags:
 *     - Recipe API
 *     summary: Delete recipe by id
 *     parameters:
 *       - in: path
 *         name: id
 *         description: recipe id
 *         required: true
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
router.delete("/recipe/delete/:id", DeleteRecipe);

module.exports = router;
