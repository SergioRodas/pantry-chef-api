interface MealIngredientDTO {
  name: string;
  measure: string;
}

export interface MealDetailDTO {
  id: string;
  name: string;
  category: string;
  area: string;
  instructions: string;
  thumbnail: string;
  tags: string[];
  youtube: string | null;
  ingredients: MealIngredientDTO[];
  source: string | null;
}

interface TheMealDBDetailResponse {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string | null;
  strSource: string | null;
  [key: string]: string | null; // Para los ingredientes y medidas dinámicos
}

export const mapToMealDetailDTO = (
  meal: TheMealDBDetailResponse
): MealDetailDTO => {
  const ingredients: MealIngredientDTO[] = [];

  // Extraer ingredientes y medidas
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (
      ingredient &&
      measure &&
      ingredient.trim() !== '' &&
      measure.trim() !== ''
    ) {
      ingredients.push({
        name: ingredient,
        measure: measure,
      });
    }
  }

  return {
    id: meal.idMeal,
    name: meal.strMeal,
    category: meal.strCategory,
    area: meal.strArea,
    instructions: meal.strInstructions,
    thumbnail: meal.strMealThumb,
    tags: meal.strTags ? meal.strTags.split(',').map((tag) => tag.trim()) : [],
    youtube: meal.strYoutube,
    ingredients,
    source: meal.strSource,
  };
};
