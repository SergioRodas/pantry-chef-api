import { RequiredFieldException } from '../../exceptions/domain.exception';
import { Meal } from '../meal.entity';

describe('Meal Entity', () => {
  it('should create a valid meal', () => {
    const meal = Meal.create(
      '52940',
      'Brown Stew Chicken',
      'https://example.com/image.jpg'
    );

    expect(meal).toBeInstanceOf(Meal);
    expect(meal.id).toBe('52940');
    expect(meal.name).toBe('Brown Stew Chicken');
    expect(meal.thumbnail).toBe('https://example.com/image.jpg');
  });

  it('should throw RequiredFieldException when id is missing', () => {
    expect(() =>
      Meal.create('', 'Brown Stew Chicken', 'https://example.com/image.jpg')
    ).toThrow(RequiredFieldException);
  });

  it('should throw RequiredFieldException when name is missing', () => {
    expect(() =>
      Meal.create('52940', '', 'https://example.com/image.jpg')
    ).toThrow(RequiredFieldException);
  });

  it('should throw RequiredFieldException when thumbnail is missing', () => {
    expect(() => Meal.create('52940', 'Brown Stew Chicken', '')).toThrow(
      RequiredFieldException
    );
  });
});
