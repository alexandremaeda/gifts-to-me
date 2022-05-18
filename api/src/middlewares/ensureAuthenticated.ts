import { Request, Response, NextFunction } from 'express';
import AppError from '../erros/AppError';

// !pending
export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  console.log('Authenticaded');

  return next();
}
