import { Request, Response } from 'express';
import prismaClient from '@prismaDatabase';

export default class ListUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const foundUsers = await prismaClient.user.findMany();

    return response.json(foundUsers);
  }
}
