import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateUserController from '../modules/accounts/useCases/createUser/CreateUserController';
import ListUsersController from '../modules/accounts/useCases/listUsers/ListUsersController';

const usersRouter = Router();

const listUsersController = new ListUsersController();
const createUserController = new CreateUserController();

usersRouter.use(ensureAuthenticated);
usersRouter.get('/', listUsersController.handle);
usersRouter.post('/', createUserController.handle);

export default usersRouter;
