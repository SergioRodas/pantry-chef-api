import { mapToMealDTO } from '../meal.dto';

describe('MealDTO', () => {
  it('should map from TheMealDB response to DTO', () => {
    const theMealDBResponse = {
      idMeal: '52940',
      strMeal: 'Brown Stew Chicken',
      strMealThumb: 'https://example.com/image.jpg',
    };

    const dto = mapToMealDTO(theMealDBResponse);

    expect(dto).toEqual({
      id: '52940',
      name: 'Brown Stew Chicken',
      thumbnail: 'https://example.com/image.jpg',
    });
  });
});
