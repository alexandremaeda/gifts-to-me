import { Router } from 'express';

import AuthenticateUserController from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';
import CreateRefreshTokenController from '@modules/accounts/useCases/createRefreshToken/CreateRefreshTokenController';

const usersRouter = Router();

const authenticateUserController = new AuthenticateUserController();
const createRefreshTokenController = new CreateRefreshTokenController();

usersRouter.post('/sessions', authenticateUserController.handle);
usersRouter.post('/refresh-token', createRefreshTokenController.handle);

export default usersRouter;
