import './infrastructure/config/env.config';
import express, { Express } from 'express';
import dotenv from 'dotenv';
import { MealController } from './infrastructure/controllers/meal.controller';
import { GetIngredientsService } from './application/services/get-ingredients.service';
import { GetMealsByIngredientService } from './application/services/get-meals-by-ingredient.service';
import { MealApiAdapter } from './infrastructure/adapters/meal-api.adapter';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Dependencies
const mealRepository = new MealApiAdapter();
const getIngredientsService = new GetIngredientsService(mealRepository);
const getMealsByIngredientService = new GetMealsByIngredientService(
  mealRepository
);
const mealController = new MealController(
  getIngredientsService,
  getMealsByIngredientService
);

app.use(express.json());

// Routes
app.get('/health', (_, res) => {
  res.status(200).json({ status: 'OK' });
});

app.get('/api/ingredients', (req, res) =>
  mealController.getIngredients(req, res)
);

app.get('/api/meals/:ingredient', (req, res) =>
  mealController.getMealsByIngredient(req, res)
);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
