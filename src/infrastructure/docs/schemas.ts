/**
 * @swagger
 * components:
 *   schemas:
 *     Ingredient:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "1"
 *         name:
 *           type: string
 *           example: "Chicken"
 *         description:
 *           type: string
 *           nullable: true
 *           example: "The chicken breast is the most popular cut"
 *         type:
 *           type: string
 *           nullable: true
 *           example: "Meat"
 *     Meal:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "52940"
 *         name:
 *           type: string
 *           example: "Brown Stew Chicken"
 *         thumbnail:
 *           type: string
 *           example: "https://www.themealdb.com/images/media/meals/sypxpx1515365095.jpg"
 *     MealIngredient:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Chicken"
 *         measure:
 *           type: string
 *           example: "1 whole"
 *     MealDetail:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "52940"
 *         name:
 *           type: string
 *           example: "Brown Stew Chicken"
 *         category:
 *           type: string
 *           example: "Chicken"
 *         area:
 *           type: string
 *           example: "Jamaican"
 *         instructions:
 *           type: string
 *           example: "1. Season chicken with salt and pepper..."
 *         thumbnail:
 *           type: string
 *           example: "https://www.themealdb.com/images/media/meals/sypxpx1515365095.jpg"
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Stew", "Meat"]
 *         youtube:
 *           type: string
 *           nullable: true
 *           example: "https://www.youtube.com/watch?v=..."
 *         ingredients:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/MealIngredient'
 *         source:
 *           type: string
 *           nullable: true
 *           example: "https://www.jamaicanfood.com/..."
 */
