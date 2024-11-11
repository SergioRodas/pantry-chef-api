import { Ingredient } from '../../../domain/entities/ingredient.entity';
import { DomainException } from '../../../domain/exceptions/domain.exception';
import { MealRepositoryPort } from '../../ports/out/meal-repository.port';
import { GetIngredientsService } from '../get-ingredients.service';

describe('GetIngredientsService', () => {
  let service: GetIngredientsService;
  let mockRepository: jest.Mocked<MealRepositoryPort>;

  beforeEach(() => {
    mockRepository = {
      getIngredients: jest.fn(),
      getMealsByIngredient: jest.fn(),
      getMealDetail: jest.fn(),
    };
    service = new GetIngredientsService(mockRepository);
  });

  it('should get ingredients successfully', async () => {
    const mockIngredients = [
      Ingredient.create('1', 'Chicken', null, null),
      Ingredient.create('2', 'Beef', 'Fresh beef', 'Meat'),
    ];

    mockRepository.getIngredients.mockResolvedValue(mockIngredients);

    const result = await service.execute();

    expect(result).toEqual(mockIngredients);
    expect(mockRepository.getIngredients).toHaveBeenCalled();
  });

  it('should handle repository errors and throw DomainException', async () => {
    mockRepository.getIngredients.mockRejectedValue(
      new Error('Database error')
    );

    await expect(service.execute()).rejects.toThrow(DomainException);
    await expect(service.execute()).rejects.toThrow(
      'Failed to fetch ingredients'
    );
  });

  it('should handle empty ingredient list', async () => {
    mockRepository.getIngredients.mockResolvedValue([]);

    const result = await service.execute();

    expect(result).toEqual([]);
    expect(mockRepository.getIngredients).toHaveBeenCalled();
  });
});
