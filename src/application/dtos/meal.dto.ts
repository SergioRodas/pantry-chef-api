export interface MealDTO {
  id: string;
  name: string;
  thumbnail: string;
}

interface TheMealDBMeal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export const mapToMealDTO = (meal: TheMealDBMeal): MealDTO => {
  return {
    id: meal.idMeal,
    name: meal.strMeal,
    thumbnail: meal.strMealThumb,
  };
};
