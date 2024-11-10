import { mapToIngredientDTO } from '../ingredient.dto';

describe('IngredientDTO', () => {
  it('should map from TheMealDB response to DTO', () => {
    const theMealDBResponse = {
      idIngredient: '1',
      strIngredient: 'Chicken',
      strDescription: 'Fresh chicken',
      strType: 'Meat',
    };

    const dto = mapToIngredientDTO(theMealDBResponse);

    expect(dto).toEqual({
      id: '1',
      name: 'Chicken',
      description: 'Fresh chicken',
      type: 'Meat',
    });
  });

  it('should handle null description and type', () => {
    const theMealDBResponse = {
      idIngredient: '1',
      strIngredient: 'Chicken',
      strDescription: null,
      strType: null,
    };

    const dto = mapToIngredientDTO(theMealDBResponse);

    expect(dto).toEqual({
      id: '1',
      name: 'Chicken',
      description: null,
      type: null,
    });
  });
});
