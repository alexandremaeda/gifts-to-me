import auth from '@config/auth';
import IUserRepository from '@modules/accounts/repositories/IUserRepository';
import IUserTokenRepository from '@modules/accounts/repositories/IUserTokenRepository';
import dayjs from 'dayjs';
import AppError from 'erros/AppError';
import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

interface IPayLoad {
  sub: string;
  email: string;
}

@injectable()
export default class CreateRefreshTokenUseCase {
  constructor(
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {}

  async execute(refreshToken: string): Promise<string> {
    const {
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = auth;

    const decode = verify(refreshToken, secret_refresh_token) as IPayLoad;

    const { sub, email } = decode;
    const userId = sub;

    const foundUserToken =
      await this.userTokenRepository.findByUserIdAndRefreshToken(
        userId,
        refreshToken,
      );

    if (!foundUserToken) throw new AppError('Refresh token does not exists!');

    await this.userTokenRepository.deleteById(foundUserToken.id);

    const newRefreshToken = sign({ email: email }, secret_refresh_token, {
      subject: userId,
      expiresIn: expires_in_refresh_token,
    });

    await this.userTokenRepository.create({
      userId,
      expiresAt: dayjs().add(expires_refresh_token_days, 'days').toDate(),
      refreshToken,
    });

    return newRefreshToken;
  }
}
