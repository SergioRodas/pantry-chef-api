import { Request, Response } from 'express';
import { GetIngredientsUseCase } from '../../application/ports/in/get-ingredients.use-case';
import { GetMealDetailUseCase } from '../../application/ports/in/get-meal-detail.use-case';
import { GetMealsByIngredientUseCase } from '../../application/ports/in/get-meals-by-ingredient.use-case';
import {
  DomainException,
  InvalidMealIdException,
  RequiredFieldException,
} from '../../domain/exceptions/domain.exception';
import {
  BadRequestException,
  HttpException,
  NotFoundException,
} from '../../shared/exceptions/http.exception';

export class MealController {
  constructor(
    private readonly getIngredientsUseCase: GetIngredientsUseCase,
    private readonly getMealsByIngredientUseCase: GetMealsByIngredientUseCase,
    private readonly getMealDetailUseCase: GetMealDetailUseCase
  ) {}

  async getIngredients(_: Request, res: Response): Promise<Response> {
    try {
      const ingredients = await this.getIngredientsUseCase.execute();
      return res.json(ingredients);
    } catch (error) {
      if (error instanceof DomainException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  async getMealsByIngredient(req: Request, res: Response): Promise<Response> {
    const ingredient = req.params.ingredient;

    if (!ingredient || !ingredient.trim()) {
      throw new BadRequestException('Ingredient is required');
    }

    const meals = await this.getMealsByIngredientUseCase.execute(ingredient);
    return res.json(meals);
  }

  async getMealDetail(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      if (!id) {
        throw new BadRequestException('Meal ID is required');
      }

      const meal = await this.getMealDetailUseCase.execute(id);

      if (!meal) {
        throw new NotFoundException('Meal');
      }

      return res.json(meal);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      if (error instanceof InvalidMealIdException) {
        throw new BadRequestException(error.message);
      }

      if (error instanceof RequiredFieldException) {
        throw new BadRequestException(error.message);
      }

      if (error instanceof DomainException) {
        throw new BadRequestException(error.message);
      }

      throw new BadRequestException('Internal server error');
    }
  }
}
