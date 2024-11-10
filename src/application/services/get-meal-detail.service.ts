import { MealDetail } from '../../domain/entities/meal-detail.entity';
import { GetMealDetailUseCase } from '../ports/in/get-meal-detail.use-case';
import { MealRepositoryPort } from '../ports/out/meal-repository.port';

export class GetMealDetailService implements GetMealDetailUseCase {
  constructor(private readonly mealRepository: MealRepositoryPort) {}

  async execute(id: string): Promise<MealDetail | null> {
    if (!id.trim()) {
      throw new Error('Meal ID cannot be empty');
    }

    // Validar que el ID sea numérico
    if (!/^\d+$/.test(id)) {
      throw new Error('Invalid meal ID format');
    }

    return this.mealRepository.getMealDetail(id);
  }
}
