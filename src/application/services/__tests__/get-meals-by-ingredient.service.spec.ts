import { GetMealsByIngredientService } from '../get-meals-by-ingredient.service';
import { MealRepositoryPort } from '../../ports/out/meal-repository.port';
import { Meal } from '../../../domain/entities/meal.entity';
import { DomainException } from '../../../domain/exceptions/domain.exception';

describe('GetMealsByIngredientService', () => {
  let service: GetMealsByIngredientService;
  let mockRepository: jest.Mocked<MealRepositoryPort>;

  beforeEach(() => {
    mockRepository = {
      getIngredients: jest.fn(),
      getMealsByIngredient: jest.fn(),
      getMealDetail: jest.fn(),
    };
    service = new GetMealsByIngredientService(mockRepository);
  });

  it('should get meals by ingredient successfully', async () => {
    const mockMeals = [
      Meal.create('1', 'Chicken Curry', 'https://example.com/curry.jpg'),
      Meal.create('2', 'Chicken Soup', 'https://example.com/soup.jpg'),
    ];

    mockRepository.getMealsByIngredient.mockResolvedValue(mockMeals);

    const result = await service.execute('chicken');

    expect(result).toEqual(mockMeals);
    expect(mockRepository.getMealsByIngredient).toHaveBeenCalledWith('chicken');
  });

  it('should throw DomainException when ingredient is empty', async () => {
    await expect(service.execute('')).rejects.toThrow(DomainException);
    await expect(service.execute('  ')).rejects.toThrow(
      'Ingredient is required'
    );
  });

  it('should handle repository errors and throw DomainException', async () => {
    mockRepository.getMealsByIngredient.mockRejectedValue(
      new Error('API error')
    );

    await expect(service.execute('chicken')).rejects.toThrow(DomainException);
    await expect(service.execute('chicken')).rejects.toThrow(
      'Failed to fetch meals'
    );
  });

  it('should handle empty meals list', async () => {
    mockRepository.getMealsByIngredient.mockResolvedValue([]);

    const result = await service.execute('nonexistent');

    expect(result).toEqual([]);
    expect(mockRepository.getMealsByIngredient).toHaveBeenCalledWith(
      'nonexistent'
    );
  });

  it('should trim ingredient name before searching', async () => {
    const mockMeals = [
      Meal.create('1', 'Chicken Curry', 'https://example.com/curry.jpg'),
    ];

    mockRepository.getMealsByIngredient.mockResolvedValue(mockMeals);

    await service.execute('  chicken  ');

    expect(mockRepository.getMealsByIngredient).toHaveBeenCalledWith('chicken');
  });
});
