import { MealDetail, MealIngredient } from '../meal-detail.entity';
import { RequiredFieldException } from '../../exceptions/domain.exception';

describe('MealIngredient Entity', () => {
  it('should create a valid meal ingredient', () => {
    const ingredient = MealIngredient.create('Chicken', '1 whole');

    expect(ingredient).toBeInstanceOf(MealIngredient);
    expect(ingredient?.name).toBe('Chicken');
    expect(ingredient?.measure).toBe('1 whole');
  });

  it('should return null when name is empty', () => {
    const ingredient = MealIngredient.create('', '1 whole');
    expect(ingredient).toBeNull();
  });

  it('should return null when measure is empty', () => {
    const ingredient = MealIngredient.create('Chicken', '');
    expect(ingredient).toBeNull();
  });
});

describe('MealDetail Entity', () => {
  const validProps = {
    id: '52940',
    name: 'Brown Stew Chicken',
    category: 'Chicken',
    area: 'Jamaican',
    instructions: 'Cook it well',
    thumbnail: 'https://example.com/image.jpg',
    tags: ['Stew', 'Spicy'],
    youtube: 'https://youtube.com/watch',
    ingredients: [new MealIngredient('Chicken', '1 whole')],
    source: null,
  };

  it('should create a valid meal detail', () => {
    const mealDetail = MealDetail.create(
      validProps.id,
      validProps.name,
      validProps.category,
      validProps.area,
      validProps.instructions,
      validProps.thumbnail,
      validProps.tags,
      validProps.youtube,
      validProps.ingredients,
      validProps.source
    );

    expect(mealDetail).toBeInstanceOf(MealDetail);
    expect(mealDetail.id).toBe(validProps.id);
    expect(mealDetail.name).toBe(validProps.name);
    expect(mealDetail.ingredients).toHaveLength(1);
    expect(mealDetail.tags).toEqual(validProps.tags);
  });

  it.each([
    ['id', { ...validProps, id: '' }],
    ['name', { ...validProps, name: '' }],
    ['category', { ...validProps, category: '' }],
    ['area', { ...validProps, area: '' }],
    ['instructions', { ...validProps, instructions: '' }],
    ['thumbnail', { ...validProps, thumbnail: '' }],
  ])(
    'should throw RequiredFieldException when %s is missing',
    (field, props) => {
      expect(() =>
        MealDetail.create(
          props.id,
          props.name,
          props.category,
          props.area,
          props.instructions,
          props.thumbnail,
          props.tags,
          props.youtube,
          props.ingredients,
          props.source
        )
      ).toThrow(RequiredFieldException);
    }
  );
});
