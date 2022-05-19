import CreateUserDTO from '@modules/accounts/dtos/CreateUserDTO';
import IUserRepository from '@modules/accounts/repositories/IUserRepository';
import { User } from '@prisma/client';
import AppError from 'erros/AppError';

import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';

@injectable()
export default class CreateUserCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ name, email, password }: CreateUserDTO): Promise<User> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) throw new AppError('User already exists');

    const passwordHash = await hash(password, 8);

    const createdUser = await this.userRepository.create({
      name,
      email,
      password: passwordHash,
    });

    return createdUser;
  }
}
