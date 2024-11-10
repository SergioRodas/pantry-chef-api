/**
 * @swagger
 * /api/ingredients:
 *   get:
 *     summary: Get all ingredients
 *     tags: [Ingredients]
 *     responses:
 *       200:
 *         description: List of ingredients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ingredient'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/meals/{ingredient}:
 *   get:
 *     summary: Get meals by ingredient
 *     tags: [Meals]
 *     parameters:
 *       - in: path
 *         name: ingredient
 *         required: true
 *         schema:
 *           type: string
 *         description: Ingredient name to search for
 *     responses:
 *       200:
 *         description: List of meals containing the ingredient
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Meal'
 *       400:
 *         description: Invalid ingredient parameter
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/meals/detail/{id}:
 *   get:
 *     summary: Get meal details by ID
 *     tags: [Meals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Meal ID
 *     responses:
 *       200:
 *         description: Detailed meal information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MealDetail'
 *       400:
 *         description: Invalid meal ID format
 *       404:
 *         description: Meal not found
 *       500:
 *         description: Server error
 */
