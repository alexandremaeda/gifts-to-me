import { Request, Response } from 'express';
import prismaClient from '@prismaDatabase';

export default class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createdUser = await prismaClient.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return response.json(createdUser);
  }
}
