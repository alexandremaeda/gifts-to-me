import { Request, Response } from 'express';
import CreateUserUseCase from './CreateUserUseCase';
import { container } from 'tsyringe';

export default class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const createdUser = await createUserUseCase.execute({
      name,
      email,
      password,
    });

    return response.json(createdUser);
  }
}
