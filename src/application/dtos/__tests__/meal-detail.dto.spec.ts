import { mapToMealDetailDTO } from '../meal-detail.dto';

describe('MealDetailDTO', () => {
  it('should map from TheMealDB response to DTO', () => {
    const theMealDBResponse = {
      idMeal: '52940',
      strMeal: 'Brown Stew Chicken',
      strCategory: 'Main Course',
      strArea: 'Jamaican',
      strInstructions: 'Cook it well',
      strMealThumb: 'https://example.com/image.jpg',
      strTags: 'Spicy,Stew',
      strYoutube: 'https://youtube.com/watch',
      strSource: 'https://source.com',
      strIngredient1: 'Chicken',
      strMeasure1: '1 whole',
      strIngredient2: '',
      strMeasure2: '',
    };

    const dto = mapToMealDetailDTO(theMealDBResponse);

    expect(dto).toEqual({
      id: '52940',
      name: 'Brown Stew Chicken',
      category: 'Main Course',
      area: 'Jamaican',
      instructions: 'Cook it well',
      thumbnail: 'https://example.com/image.jpg',
      tags: ['Spicy', 'Stew'],
      youtube: 'https://youtube.com/watch',
      ingredients: [
        {
          name: 'Chicken',
          measure: '1 whole',
        },
      ],
      source: 'https://source.com',
    });
  });

  it('should handle null optional fields', () => {
    const theMealDBResponse = {
      idMeal: '52940',
      strMeal: 'Brown Stew Chicken',
      strCategory: 'Main Course',
      strArea: 'Jamaican',
      strInstructions: 'Cook it well',
      strMealThumb: 'https://example.com/image.jpg',
      strTags: null,
      strYoutube: null,
      strSource: null,
      strIngredient1: 'Chicken',
      strMeasure1: '1 whole',
      strIngredient2: '',
      strMeasure2: '',
    };

    const dto = mapToMealDetailDTO(theMealDBResponse);

    expect(dto).toEqual({
      id: '52940',
      name: 'Brown Stew Chicken',
      category: 'Main Course',
      area: 'Jamaican',
      instructions: 'Cook it well',
      thumbnail: 'https://example.com/image.jpg',
      tags: [],
      youtube: null,
      ingredients: [
        {
          name: 'Chicken',
          measure: '1 whole',
        },
      ],
      source: null,
    });
  });
});
