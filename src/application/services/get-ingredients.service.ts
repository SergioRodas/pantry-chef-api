import { Ingredient } from '../../domain/entities/ingredient.entity';
import { GetIngredientsUseCase } from '../ports/in/get-ingredients.use-case';
import { MealRepositoryPort } from '../ports/out/meal-repository.port';

export class GetIngredientsService implements GetIngredientsUseCase {
  constructor(private readonly mealRepository: MealRepositoryPort) {}

  async execute(): Promise<Ingredient[]> {
    return this.mealRepository.getIngredients();
  }
}
