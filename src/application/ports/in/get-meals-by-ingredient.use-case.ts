import { Meal } from '../../../domain/entities/meal.entity';

export interface GetMealsByIngredientUseCase {
  execute(ingredient: string): Promise<Meal[]>;
}
