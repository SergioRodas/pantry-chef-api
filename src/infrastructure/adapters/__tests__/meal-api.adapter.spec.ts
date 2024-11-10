import { MealApiAdapter } from '../meal-api.adapter';
import { axiosInstance } from '../../config/axios.config';

// Mock axios
jest.mock('../../config/axios.config', () => ({
  axiosInstance: {
    get: jest.fn(),
  },
}));

describe('MealApiAdapter', () => {
  let adapter: MealApiAdapter;
  const mockedAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;

  beforeEach(() => {
    adapter = new MealApiAdapter();
    jest.clearAllMocks();
  });

  describe('getIngredients', () => {
    it('should fetch ingredients successfully', async () => {
      const mockApiResponse = {
        data: {
          meals: [
            {
              idIngredient: '1',
              strIngredient: 'Chicken',
              strDescription: 'Fresh chicken breast',
              strType: 'Meat',
            },
          ],
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockApiResponse);

      const result = await adapter.getIngredients();

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
      expect(result[0].name).toBe('Chicken');
      expect(mockedAxios.get).toHaveBeenCalled();
    });

    it('should handle API errors', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

      await expect(adapter.getIngredients()).rejects.toThrow(
        'Failed to fetch ingredients'
      );
    });
  });

  describe('getMealsByIngredient', () => {
    it('should fetch meals by ingredient successfully', async () => {
      const mockApiResponse = {
        data: {
          meals: [
            {
              idMeal: '1',
              strMeal: 'Chicken Curry',
              strMealThumb: 'thumbnail.jpg',
            },
          ],
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockApiResponse);

      const result = await adapter.getMealsByIngredient('chicken');

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
      expect(result[0].name).toBe('Chicken Curry');
      expect(mockedAxios.get).toHaveBeenCalled();
    });

    it('should return empty array when no meals found', async () => {
      const mockApiResponse = {
        data: {
          meals: null,
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockApiResponse);

      const result = await adapter.getMealsByIngredient('nonexistent');

      expect(result).toHaveLength(0);
    });

    it('should handle API errors', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

      await expect(adapter.getMealsByIngredient('chicken')).rejects.toThrow(
        'Failed to fetch meals'
      );
    });
  });

  describe('getMealDetail', () => {
    it('should fetch meal detail successfully', async () => {
      const mockApiResponse = {
        data: {
          meals: [
            {
              idMeal: '1',
              strMeal: 'Chicken Curry',
              strCategory: 'Main',
              strArea: 'Indian',
              strInstructions: 'Cook well',
              strMealThumb: 'thumbnail.jpg',
              strTags: 'Spicy,Curry',
              strYoutube: null,
              strSource: null,
              strIngredient1: 'Chicken',
              strMeasure1: '1 whole',
              strIngredient2: '',
              strMeasure2: '',
            },
          ],
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockApiResponse);

      const result = await adapter.getMealDetail('1');

      expect(result).not.toBeNull();
      expect(result?.id).toBe('1');
      expect(result?.name).toBe('Chicken Curry');
      expect(result?.ingredients).toHaveLength(1);
      expect(mockedAxios.get).toHaveBeenCalled();
    });

    it('should return null when meal not found', async () => {
      const mockApiResponse = {
        data: {
          meals: null,
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockApiResponse);

      const result = await adapter.getMealDetail('999');

      expect(result).toBeNull();
    });

    it('should handle API errors', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

      await expect(adapter.getMealDetail('1')).rejects.toThrow(
        'Failed to fetch meal detail'
      );
    });
  });
});
