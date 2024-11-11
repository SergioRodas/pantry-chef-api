import { MealDetail } from '../../../domain/entities/meal-detail.entity';
import { InvalidMealIdException } from '../../../domain/exceptions/domain.exception';
import { MealRepositoryPort } from '../../ports/out/meal-repository.port';
import { GetMealDetailService } from '../get-meal-detail.service';

describe('GetMealDetailService', () => {
  let service: GetMealDetailService;
  let mockRepository: jest.Mocked<MealRepositoryPort>;

  beforeEach(() => {
    mockRepository = {
      getIngredients: jest.fn(),
      getMealsByIngredient: jest.fn(),
      getMealDetail: jest.fn(),
    };
    service = new GetMealDetailService(mockRepository);
  });

  it('should get meal detail successfully', async () => {
    const mockMealDetail = {
      id: '52940',
      name: 'Brown Stew Chicken',
      category: 'Chicken',
      area: 'Jamaican',
      instructions: 'Cook it well',
      thumbnail: 'https://example.com/image.jpg',
      tags: ['Stew', 'Spicy'],
      youtube: 'https://youtube.com/watch',
      ingredients: [{ name: 'Chicken', measure: '1 whole' }],
      source: null,
    } as MealDetail;

    mockRepository.getMealDetail.mockResolvedValue(mockMealDetail);

    const result = await service.execute('52940');

    expect(result).toBe(mockMealDetail);
    expect(mockRepository.getMealDetail).toHaveBeenCalledWith('52940');
  });

  it('should throw InvalidMealIdException when id is empty', async () => {
    await expect(service.execute('')).rejects.toThrow(InvalidMealIdException);
  });

  it('should throw InvalidMealIdException when id is not numeric', async () => {
    await expect(service.execute('abc')).rejects.toThrow(
      InvalidMealIdException
    );
  });

  it('should return null when meal is not found', async () => {
    mockRepository.getMealDetail.mockResolvedValue(null);

    const result = await service.execute('52940');

    expect(result).toBeNull();
    expect(mockRepository.getMealDetail).toHaveBeenCalledWith('52940');
  });
});
