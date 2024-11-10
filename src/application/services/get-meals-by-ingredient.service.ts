import { GetMealsByIngredientUseCase } from '../ports/in/get-meals-by-ingredient.use-case';
import { MealRepositoryPort } from '../ports/out/meal-repository.port';
import { Meal } from '../../domain/entities/meal.entity';
import { DomainException } from '../../domain/exceptions/domain.exception';

export class GetMealsByIngredientService
  implements GetMealsByIngredientUseCase
{
  constructor(private readonly mealRepository: MealRepositoryPort) {}

  async execute(ingredient: string): Promise<Meal[]> {
    if (!ingredient.trim()) {
      throw new DomainException('Ingredient is required');
    }

    try {
      const trimmedIngredient = ingredient.trim();
      return await this.mealRepository.getMealsByIngredient(trimmedIngredient);
    } catch (error) {
      if (error instanceof DomainException) {
        throw error;
      }
      throw new DomainException('Failed to fetch meals');
    }
  }
}
