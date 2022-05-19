import { Router } from 'express';
import authenticateRouter from './authenticate.routes';
import usersRouter from '../routes/users.routes';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Gifts to me API is Online!!! ❤' });
});

routes.use(authenticateRouter);
routes.use('/users', usersRouter);

export default routes;
