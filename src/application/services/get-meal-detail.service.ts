import { MealDetail } from '../../domain/entities/meal-detail.entity';
import { InvalidMealIdException } from '../../domain/exceptions/domain.exception';
import { GetMealDetailUseCase } from '../ports/in/get-meal-detail.use-case';
import { MealRepositoryPort } from '../ports/out/meal-repository.port';

export class GetMealDetailService implements GetMealDetailUseCase {
  constructor(private readonly mealRepository: MealRepositoryPort) {}

  async execute(id: string): Promise<MealDetail | null> {
    if (!id.trim()) {
      throw new InvalidMealIdException();
    }

    if (!/^\d+$/.test(id)) {
      throw new InvalidMealIdException();
    }

    return this.mealRepository.getMealDetail(id);
  }
}
