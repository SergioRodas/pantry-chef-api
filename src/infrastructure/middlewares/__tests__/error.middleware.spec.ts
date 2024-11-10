import { Request, Response } from 'express';
import { errorMiddleware } from '../error.middleware';
import { HttpException } from '../../../shared/exceptions/http.exception';

describe('Error Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
  });

  it('should handle HttpException', () => {
    const error = new HttpException(400, 'Bad Request');

    errorMiddleware(
      error,
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Bad Request',
    });
  });

  it('should handle unknown errors', () => {
    const error = new Error('Unknown error');

    errorMiddleware(
      error,
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Internal server error',
    });
  });
});
