import { Ingredient } from '../../domain/entities/ingredient.entity';
import { Meal } from '../../domain/entities/meal.entity';
import { MealRepositoryPort } from '../../application/ports/out/meal-repository.port';
import { axiosInstance } from '../config/axios.config';
import { API_URLS } from '../../shared/constants/api.constants';

interface TheMealDBIngredient {
  idIngredient: string;
  strIngredient: string;
  strDescription: string | null;
  strType: string | null;
}

interface TheMealDBMeal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface TheMealDBIngredientsResponse {
  meals: TheMealDBIngredient[];
}

interface TheMealDBMealsResponse {
  meals: TheMealDBMeal[] | null;
}

export class MealApiAdapter implements MealRepositoryPort {
  async getIngredients(): Promise<Ingredient[]> {
    try {
      const { data } = await axiosInstance.get<TheMealDBIngredientsResponse>(
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

  async getMealsByIngredient(ingredient: string): Promise<Meal[]> {
    try {
      const { data } = await axiosInstance.get<TheMealDBMealsResponse>(
        `${API_URLS.ENDPOINTS.FILTER_BY_INGREDIENT}${ingredient}`
      );

      if (!data.meals) {
        return [];
      }

      return data.meals.map((meal) =>
        Meal.create(meal.idMeal, meal.strMeal, meal.strMealThumb)
      );
    } catch (error) {
      console.error('Error fetching meals:', error);
      throw new Error('Failed to fetch meals');
    }
  }
}
