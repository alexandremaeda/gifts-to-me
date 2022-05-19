import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../erros/AppError';
import auth from '@config/auth';
import UserTokenRepository from '@modules/accounts/repositories/prisma/UserTokenRepository';

interface IPayload {
  sub: string;
  name: string;
  email: string;
}

export default async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new AppError('Token missign', 401);

  const [, refresh_token] = authHeader.split(' ');

  try {
    const { sub: userId } = verify(
      refresh_token,
      auth.secret_refresh_token,
    ) as IPayload;

    const usersTokensRepository = new UserTokenRepository();

    const foundUser = await usersTokensRepository.findByUserIdAndRefreshToken(
      userId,
      refresh_token,
    );

    if (!foundUser) throw new AppError('User does not exist', 401);

    req.user = {
      id: foundUser.userId,
    };

    return next();
  } catch (err) {
    console.error(err);

    throw new AppError('Invalid refresh token', 401);
  }
}
