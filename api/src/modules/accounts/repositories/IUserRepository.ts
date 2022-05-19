import { Prisma, User } from '@prisma/client';
import CreateUserDTO from '../dtos/CreateUserDTO';

interface IUsersRepository {
  create({ name, email, password }: CreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}

export default IUsersRepository;
