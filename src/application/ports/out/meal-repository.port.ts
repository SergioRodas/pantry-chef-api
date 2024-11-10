import { Ingredient } from '../../../domain/entities/ingredient.entity';

export interface MealRepositoryPort {
  getIngredients(): Promise<Ingredient[]>;
}
