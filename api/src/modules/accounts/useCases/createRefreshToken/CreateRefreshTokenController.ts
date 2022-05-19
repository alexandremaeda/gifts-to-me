import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateRefreshTokenUseCase from './CreateRefreshTokenUseCase';

export default class CreateRefreshTokenController {
  async handle(req: Request, res: Response): Promise<Response> {
    const refreshToken =
      req.body.refreshToken ||
      req.headers['x-access-token'] ||
      req.query.refreshToken;

    const createRefreshToken = container.resolve(CreateRefreshTokenUseCase);

    const newRefreshToken = await createRefreshToken.execute(refreshToken);

    return res.status(201).json({ refresh_token: newRefreshToken });
  }
}
