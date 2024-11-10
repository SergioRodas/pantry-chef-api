import { MealDetail } from '../../../domain/entities/meal-detail.entity';

export interface GetMealDetailUseCase {
  execute(id: string): Promise<MealDetail | null>;
}
