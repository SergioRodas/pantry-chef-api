import { Ingredient } from '../../../domain/entities/ingredient.entity';

export interface GetIngredientsUseCase {
  execute(): Promise<Ingredient[]>;
}
