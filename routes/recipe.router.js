const express = require("express");
const {
  GetRecipes,
  GetRecipe,
  CreateRecipe,
  UpdateRecipe,
  DeleteRecipe,
} = require("../controller/recipe.controller");

const router = express.Router();
/** GET Methods */
/**
 * @openapi
 * '/api/recipe/get-all':
 *  get:
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
router.get("/api/recipe/get-all", GetRecipes);
/**
 * @openapi
 * '/api/recipe/:id':
 *  get:
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

router.get("/api/recipe/:id", GetRecipe);
/** POST Methods */
/**
 * @openapi
 * '/api/recipe/create':
 *  post:
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
 *                     type: string
 *                  ]
 *                  default: []
 *              instructions:
 *                  type: array
 *                  description: instructions of the recipe
 *                  items: [
 *                    type: string
 *                  ]
 *                  default: []
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
 *              rating:
 *                type: number
 *                description: rating of the recipe
 *              comments:
 *                type: array
 *                description: comments of the recipe
 *                items: [
 *                 type: string
 *                ]
 *                default: []
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
router.post("/api/recipe/create", CreateRecipe);
router.put("/api/recipe/update/:id", UpdateRecipe);
router.delete("/api/recipe/delete/:id", DeleteRecipe);

module.exports = router;
