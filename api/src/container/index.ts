import { container } from 'tsyringe';

import IUserRepository from '@modules/accounts/repositories/IUserRepository';
import UserRepository from '@modules/accounts/repositories/prisma/UserRepository';

import IUserTokenRepository from '@modules/accounts/repositories/IUserTokenRepository';
import UserTokenRepository from '@modules/accounts/repositories/prisma/UserTokenRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokenRepository,
);
