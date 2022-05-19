import { inject, injectable } from 'tsyringe';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import auth from '@config/auth';
import dayjs from 'dayjs';
import IUserRepository from '@modules/accounts/repositories/IUserRepository';
import IUserTokenRepository from '@modules/accounts/repositories/IUserTokenRepository';
import AppError from 'erros/AppError';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  refreshToken: string;
  user: {
    name: string;
    email: string;
  };
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const {
      secret_token,
      expires_in_token,
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = auth;

    const foundUser = await this.userRepository.findByEmail(email);

    if (!foundUser) throw new AppError('Email or password incorrect');

    const passwordMatch = await compare(password, foundUser.password);

    if (!passwordMatch) throw new AppError('Email or password incorrect');

    const token = sign(
      { name: foundUser.name, email: foundUser.email },
      secret_token,
      { subject: foundUser.id, expiresIn: expires_in_token },
    );

    const refreshToken = sign(
      { email: foundUser.email },
      secret_refresh_token,
      { subject: foundUser.id, expiresIn: expires_in_refresh_token },
    );

    await this.userTokenRepository.create({
      userId: foundUser.id,
      expiresAt: dayjs().add(expires_refresh_token_days, 'days').toDate(),
      refreshToken,
    });

    return {
      token,
      refreshToken,
      user: { name: foundUser.name, email: foundUser.email },
    };
  }
}

export default AuthenticateUserUseCase;
