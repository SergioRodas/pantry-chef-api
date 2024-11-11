import { MealRepositoryPort } from '../../application/ports/out/meal-repository.port';
import { Ingredient } from '../../domain/entities/ingredient.entity';
import {
  MealDetail,
  MealIngredient,
} from '../../domain/entities/meal-detail.entity';
import { Meal } from '../../domain/entities/meal.entity';
import { DomainException } from '../../domain/exceptions/domain.exception';
import { API_URLS } from '../../shared/constants/api.constants';
import { axiosInstance } from '../config/axios.config';

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

interface TheMealDBDetailResponse {
  meals:
    | {
        idMeal: string;
        strMeal: string;
        strCategory: string;
        strArea: string;
        strInstructions: string;
        strMealThumb: string;
        strTags: string | null;
        strYoutube: string | null;
        strSource: string | null;
        [key: string]: string | null;
      }[]
    | null;
}

export class MealApiAdapter implements MealRepositoryPort {
  async getIngredients(): Promise<Ingredient[]> {
    try {
      const { data } = await axiosInstance.get<TheMealDBIngredientsResponse>(
        API_URLS.ENDPOINTS.LIST_INGREDIENTS
      );

      if (!data.meals) {
        return [];
      }

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
      throw new DomainException('Failed to fetch ingredients');
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
      throw new DomainException('Failed to fetch meals');
    }
  }

  async getMealDetail(id: string): Promise<MealDetail | null> {
    try {
      const { data } = await axiosInstance.get<TheMealDBDetailResponse>(
        `${API_URLS.ENDPOINTS.MEAL_DETAIL}${id}`
      );

      if (!data.meals) {
        return null;
      }

      const meal = data.meals[0];
      const ingredients: MealIngredient[] = [];

      // Extraer ingredientes y medidas
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        const mealIngredient = MealIngredient.create(
          ingredient || '',
          measure || ''
        );

        if (mealIngredient) {
          ingredients.push(mealIngredient);
        }
      }

      return MealDetail.create(
        meal.idMeal,
        meal.strMeal,
        meal.strCategory,
        meal.strArea,
        meal.strInstructions,
        meal.strMealThumb,
        meal.strTags ? meal.strTags.split(',').map((tag) => tag.trim()) : [],
        meal.strYoutube,
        ingredients,
        meal.strSource
      );
    } catch (error) {
      console.error('Error fetching meal detail:', error);
      throw new DomainException('Failed to fetch meal detail');
    }
  }
}
