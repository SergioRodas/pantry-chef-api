import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { HttpException } from '../../shared/exceptions/http.exception';

export const errorMiddleware: ErrorRequestHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (error instanceof HttpException) {
    res.status(error.statusCode).json({
      message: error.message,
    });
    return;
  }

  console.error('Unhandled error:', error);
  res.status(500).json({
    message: 'Internal server error',
  });
};
