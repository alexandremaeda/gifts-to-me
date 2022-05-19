import CreateUserDTO from '@modules/accounts/dtos/CreateUserDTO';
import { Prisma, User } from '@prisma/client';
import prismaClient from '@prismaDatabase';
import IUserRepository from '../IUserRepository';

class UserRepository implements IUserRepository {
  private repository;

  constructor() {
    this.repository = prismaClient.user;
  }

  create({ name, email, password }: CreateUserDTO): Promise<User> {
    return this.repository.create({ data: { name, email, password } });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.repository.findUnique({ where: { email } });
  }
}

export default UserRepository;
