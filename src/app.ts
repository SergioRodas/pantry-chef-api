import './infrastructure/config/env.config';
import express, {
  Express,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './infrastructure/config/swagger.config';
import { MealController } from './infrastructure/controllers/meal.controller';
import { GetIngredientsService } from './application/services/get-ingredients.service';
import { GetMealsByIngredientService } from './application/services/get-meals-by-ingredient.service';
import { GetMealDetailService } from './application/services/get-meal-detail.service';
import { MealApiAdapter } from './infrastructure/adapters/meal-api.adapter';
import { errorMiddleware } from './infrastructure/middlewares/error.middleware';

dotenv.config();

const app: Express = express();

// Dependencies
const mealRepository = new MealApiAdapter();
const getIngredientsService = new GetIngredientsService(mealRepository);
const getMealsByIngredientService = new GetMealsByIngredientService(
  mealRepository
);
const getMealDetailService = new GetMealDetailService(mealRepository);

const mealController = new MealController(
  getIngredientsService,
  getMealsByIngredientService,
  getMealDetailService
);

// Helper para envolver los métodos del controlador
const asyncHandler =
  (fn: (req: Request, res: Response) => Promise<Response>): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn.bind(mealController)(req, res)).catch(next);
  };

app.use(express.json());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSpec));

// Routes
app.get('/health', (_, res) => {
  res.status(200).json({ status: 'OK' });
});

app.get('/api/ingredients', asyncHandler(mealController.getIngredients));
app.get(
  '/api/meals/:ingredient',
  asyncHandler(mealController.getMealsByIngredient)
);
app.get('/api/meals/detail/:id', asyncHandler(mealController.getMealDetail));

// Error handling
app.use(errorMiddleware);

export { app };
