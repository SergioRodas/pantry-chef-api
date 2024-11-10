import { Ingredient } from '../../../domain/entities/ingredient.entity';
import { Meal } from '../../../domain/entities/meal.entity';

export interface MealRepositoryPort {
  getIngredients(): Promise<Ingredient[]>;
  getMealsByIngredient(ingredient: string): Promise<Meal[]>;
}
