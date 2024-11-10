import { Meal } from '../../domain/entities/meal.entity';
import { GetMealsByIngredientUseCase } from '../ports/in/get-meals-by-ingredient.use-case';
import { MealRepositoryPort } from '../ports/out/meal-repository.port';

export class GetMealsByIngredientService
  implements GetMealsByIngredientUseCase
{
  constructor(private readonly mealRepository: MealRepositoryPort) {}

  async execute(ingredient: string): Promise<Meal[]> {
    if (!ingredient.trim()) {
      throw new Error('Ingredient cannot be empty');
    }

    return this.mealRepository.getMealsByIngredient(ingredient);
  }
}
