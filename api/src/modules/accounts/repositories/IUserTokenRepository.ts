import { UserToken } from '@prisma/client';
import CreateUserTokenDTO from '../dtos/CreateUserTokenDTO';

interface IUsersRepository {
  create({
    userId,
    refreshToken,
    expiresAt,
  }: CreateUserTokenDTO): Promise<UserToken>;
  findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<UserToken | null>;
  deleteById(id: string): Promise<void>;
}

export default IUsersRepository;
