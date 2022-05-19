import CreateUserTokenDTO from '@modules/accounts/dtos/CreateUserTokenDTO';
import { UserToken } from '@prisma/client';
import prismaClient from '@prismaDatabase';
import IUserTokenRepository from '../IUserTokenRepository';

class UserRepository implements IUserTokenRepository {
  private repository;

  constructor() {
    this.repository = prismaClient.userToken;
  }

  create({
    userId,
    refreshToken,
    expiresAt,
  }: CreateUserTokenDTO): Promise<UserToken> {
    return this.repository.create({
      data: { userId, refreshToken, expiresAt },
    });
  }

  findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<UserToken | null> {
    return this.repository.findFirst({ where: { userId, refreshToken } });
  }

  deleteById(id: string): Promise<void> {
    return this.repository.delete({ where: { id } });
  }
}

export default UserRepository;
