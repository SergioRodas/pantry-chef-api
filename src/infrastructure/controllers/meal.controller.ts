import { Request, Response } from 'express';
import { GetIngredientsUseCase } from '../../application/ports/in/get-ingredients.use-case';

export class MealController {
  constructor(private readonly getIngredientsUseCase: GetIngredientsUseCase) {}

  async getIngredients(_: Request, res: Response): Promise<void> {
    try {
      const ingredients = await this.getIngredientsUseCase.execute();
      res.json(ingredients);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
