import { Request, Response } from 'express';
import { GetIngredientsUseCase } from '../../application/ports/in/get-ingredients.use-case';
import { GetMealsByIngredientUseCase } from '../../application/ports/in/get-meals-by-ingredient.use-case';

export class MealController {
  constructor(
    private readonly getIngredientsUseCase: GetIngredientsUseCase,
    private readonly getMealsByIngredientUseCase: GetMealsByIngredientUseCase
  ) {}

  async getIngredients(_: Request, res: Response): Promise<void> {
    try {
      const ingredients = await this.getIngredientsUseCase.execute();
      res.json(ingredients);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getMealsByIngredient(req: Request, res: Response): Promise<void> {
    try {
      const { ingredient } = req.params;

      if (!ingredient) {
        res.status(400).json({ message: 'Ingredient is required' });
        return;
      }

      const meals = await this.getMealsByIngredientUseCase.execute(ingredient);
      res.json(meals);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
