import { Ingredient } from '../../domain/entities/ingredient.entity';
import { MealRepositoryPort } from '../../application/ports/out/meal-repository.port';
import { axiosInstance } from '../config/axios.config';
import { API_URLS } from '../../shared/constants/api.constants';

interface TheMealDBIngredient {
  idIngredient: string;
  strIngredient: string;
  strDescription: string | null;
  strType: string | null;
}

interface TheMealDBResponse {
  meals: TheMealDBIngredient[];
}

export class MealApiAdapter implements MealRepositoryPort {
  async getIngredients(): Promise<Ingredient[]> {
    try {
      const { data } = await axiosInstance.get<TheMealDBResponse>(
        API_URLS.ENDPOINTS.LIST_INGREDIENTS
      );

      return data.meals.map((ingredient) =>
        Ingredient.create(
          ingredient.idIngredient,
          ingredient.strIngredient,
          ingredient.strDescription,
          ingredient.strType
        )
      );
    } catch (error) {
      console.error('Error fetching ingredients:', error);
      throw new Error('Failed to fetch ingredients');
    }
  }
}
