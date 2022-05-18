import { Request, Response, NextFunction } from 'express';
import AppError from '../erros/AppError';

export default function globallyErrors(
  error: Error,
  request: Request,
  response: Response,
  _: NextFunction,
) {
  if (error instanceof AppError) {
    return response
      .status(error.statusCode)
      .json({ status: 'error', message: error.message });
  }

  console.error(error);

  return response
    .status(500)
    .json({ status: 500, message: `internal server error ${error.message}` });
}
