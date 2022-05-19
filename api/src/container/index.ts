import { container } from 'tsyringe';

import IUserRepository from '@modules/accounts/repositories/IUserRepository';
import UserRepository from '@modules/accounts/repositories/prisma/UserRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
