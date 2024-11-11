import { Request, Response } from 'express';
import { GetIngredientsUseCase } from '../../../application/ports/in/get-ingredients.use-case';
import { GetMealDetailUseCase } from '../../../application/ports/in/get-meal-detail.use-case';
import { GetMealsByIngredientUseCase } from '../../../application/ports/in/get-meals-by-ingredient.use-case';
import { Ingredient } from '../../../domain/entities/ingredient.entity';
import {
  MealDetail,
  MealIngredient,
} from '../../../domain/entities/meal-detail.entity';
import { Meal } from '../../../domain/entities/meal.entity';
import {
  DomainException,
  InvalidMealIdException,
} from '../../../domain/exceptions/domain.exception';
import {
  BadRequestException,
  NotFoundException,
} from '../../../shared/exceptions/http.exception';
import { MealController } from '../meal.controller';

describe('MealController', () => {
  let controller: MealController;
  let mockGetIngredientsUseCase: jest.Mocked<GetIngredientsUseCase>;
  let mockGetMealsByIngredientUseCase: jest.Mocked<GetMealsByIngredientUseCase>;
  let mockGetMealDetailUseCase: jest.Mocked<GetMealDetailUseCase>;
  let mockResponse: Response;
  let mockRequest: Partial<Request>;

  beforeEach(() => {
    mockGetIngredientsUseCase = {
      execute: jest.fn(),
    };
    mockGetMealsByIngredientUseCase = {
      execute: jest.fn(),
    };
    mockGetMealDetailUseCase = {
      execute: jest.fn(),
    };

    mockResponse = {
      json: jest.fn(),
    } as unknown as Response;

    mockRequest = {};

    controller = new MealController(
      mockGetIngredientsUseCase,
      mockGetMealsByIngredientUseCase,
      mockGetMealDetailUseCase
    );
  });

  describe('getIngredients', () => {
    it('should return ingredients successfully', async () => {
      const mockIngredients = [Ingredient.create('1', 'Chicken', null, null)];

      mockGetIngredientsUseCase.execute.mockResolvedValue(mockIngredients);

      await controller.getIngredients(mockRequest as Request, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith(mockIngredients);
    });

    it('should handle domain exception', async () => {
      mockGetIngredientsUseCase.execute.mockRejectedValue(
        new DomainException('Domain error')
      );

      await expect(
        controller.getIngredients(mockRequest as Request, mockResponse)
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('getMealsByIngredient', () => {
    it('should return meals by ingredient successfully', async () => {
      const mockMeals = [Meal.create('1', 'Chicken Curry', 'thumbnail.jpg')];

      mockRequest.params = { ingredient: 'chicken' };
      mockGetMealsByIngredientUseCase.execute.mockResolvedValue(mockMeals);

      await controller.getMealsByIngredient(
        mockRequest as Request,
        mockResponse
      );

      expect(mockResponse.json).toHaveBeenCalledWith(mockMeals);
    });

    it('should throw BadRequestException when ingredient is missing', async () => {
      mockRequest.params = {};

      await expect(
        controller.getMealsByIngredient(mockRequest as Request, mockResponse)
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('getMealDetail', () => {
    const ingredient = MealIngredient.create('Chicken', '1 whole');
    if (!ingredient) {
      throw new Error('Failed to create test ingredient');
    }

    const mockMealDetail = MealDetail.create(
      '1',
      'Chicken Curry',
      'Main',
      'Indian',
      'Cook well',
      'thumbnail.jpg',
      ['Spicy'],
      null,
      [ingredient],
      null
    );

    it('should return meal detail successfully', async () => {
      mockRequest.params = { id: '1' };
      mockGetMealDetailUseCase.execute.mockResolvedValue(mockMealDetail);

      await controller.getMealDetail(mockRequest as Request, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith(mockMealDetail);
    });

    it('should throw BadRequestException when id is missing', async () => {
      mockRequest.params = {};

      await expect(
        controller.getMealDetail(mockRequest as Request, mockResponse)
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException when meal is not found', async () => {
      mockRequest.params = { id: '1' };
      mockGetMealDetailUseCase.execute.mockResolvedValue(null);

      await expect(
        controller.getMealDetail(mockRequest as Request, mockResponse)
      ).rejects.toThrow(NotFoundException);
    });

    it('should handle InvalidMealIdException', async () => {
      mockRequest.params = { id: '1' };
      mockGetMealDetailUseCase.execute.mockRejectedValue(
        new InvalidMealIdException()
      );

      await expect(
        controller.getMealDetail(mockRequest as Request, mockResponse)
      ).rejects.toThrow(BadRequestException);
    });
  });
});
