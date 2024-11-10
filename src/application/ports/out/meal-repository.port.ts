import { Ingredient } from '../../../domain/entities/ingredient.entity';
import { Meal } from '../../../domain/entities/meal.entity';
import { MealDetail } from '../../../domain/entities/meal-detail.entity';

export interface MealRepositoryPort {
  getIngredients(): Promise<Ingredient[]>;
  getMealsByIngredient(ingredient: string): Promise<Meal[]>;
  getMealDetail(id: string): Promise<MealDetail | null>;
}
