import { Request, Response } from 'express';

export default class CreateUserController {
  handle(request: Request, response: Response): Response {
    const { name } = request.body;

    return response.json({ name });
  }
}
