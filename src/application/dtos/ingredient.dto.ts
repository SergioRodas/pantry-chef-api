export interface IngredientDTO {
  id: string;
  name: string;
  description: string | null;
  type: string | null;
}

interface TheMealDBIngredient {
  idIngredient: string;
  strIngredient: string;
  strDescription: string | null;
  strType: string | null;
}

export const mapToIngredientDTO = (
  ingredient: TheMealDBIngredient
): IngredientDTO => {
  return {
    id: ingredient.idIngredient,
    name: ingredient.strIngredient,
    description: ingredient.strDescription,
    type: ingredient.strType,
  };
};
