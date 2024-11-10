import { Ingredient } from '../ingredient.entity';
import { RequiredFieldException } from '../../exceptions/domain.exception';

describe('Ingredient Entity', () => {
  it('should create a valid ingredient', () => {
    const ingredient = Ingredient.create(
      '1',
      'Chicken',
      'Fresh chicken breast',
      'Meat'
    );

    expect(ingredient).toBeInstanceOf(Ingredient);
    expect(ingredient.id).toBe('1');
    expect(ingredient.name).toBe('Chicken');
    expect(ingredient.description).toBe('Fresh chicken breast');
    expect(ingredient.type).toBe('Meat');
  });

  it('should create ingredient with null description and type', () => {
    const ingredient = Ingredient.create('1', 'Chicken', null, null);

    expect(ingredient).toBeInstanceOf(Ingredient);
    expect(ingredient.description).toBeNull();
    expect(ingredient.type).toBeNull();
  });

  it('should throw RequiredFieldException when id is missing', () => {
    expect(() => Ingredient.create('', 'Chicken', null, null)).toThrow(
      RequiredFieldException
    );
  });

  it('should throw RequiredFieldException when name is missing', () => {
    expect(() => Ingredient.create('1', '', null, null)).toThrow(
      RequiredFieldException
    );
  });
});
