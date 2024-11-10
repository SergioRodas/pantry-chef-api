import { Ingredient } from '../../domain/entities/ingredient.entity';
import { DomainException } from '../../domain/exceptions/domain.exception';
import { GetIngredientsUseCase } from '../ports/in/get-ingredients.use-case';
import { MealRepositoryPort } from '../ports/out/meal-repository.port';

export class GetIngredientsService implements GetIngredientsUseCase {
  constructor(private readonly mealRepository: MealRepositoryPort) {}

  async execute(): Promise<Ingredient[]> {
    try {
      return await this.mealRepository.getIngredients();
    } catch (error) {
      if (error instanceof DomainException) {
        throw error;
      }
      throw new Error('Failed to fetch ingredients');
    }
  }
}
