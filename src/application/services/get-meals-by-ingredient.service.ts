import { Meal } from '../../domain/entities/meal.entity';
import { DomainException } from '../../domain/exceptions/domain.exception';
import { GetMealsByIngredientUseCase } from '../ports/in/get-meals-by-ingredient.use-case';
import { MealRepositoryPort } from '../ports/out/meal-repository.port';

export class GetMealsByIngredientService
  implements GetMealsByIngredientUseCase
{
  constructor(private readonly mealRepository: MealRepositoryPort) {}

  async execute(ingredient: string): Promise<Meal[]> {
    if (!ingredient.trim()) {
      throw new DomainException('Ingredient cannot be empty');
    }

    try {
      return await this.mealRepository.getMealsByIngredient(ingredient);
    } catch (error) {
      if (error instanceof DomainException) {
        throw error;
      }
      throw new Error('Failed to fetch meals');
    }
  }
}
