import { Request, Response } from 'express';

export default class ListUsersController {
  handle(request: Request, response: Response): Response {
    return response.json({ message: 'Users' });
  }
}
