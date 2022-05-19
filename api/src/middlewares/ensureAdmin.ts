import UsersRepository from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';

export default async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.user;

  const usersRepository = new UsersRepository();
  const foundUser = await usersRepository.findById(id);

  if (!foundUser) throw new AppError('User not found');

  if (!foundUser.isAdmin) throw new AppError("User isn't a admin", 403);

  return next();
}
