import express from 'express';
import 'express-async-errors';
import routes from './routes';
import globallyErrors from './middlewares/globallyErrors';

const port = 3333;
const app = express();

app.use(express.json());
app.use(routes);

app.use(globallyErrors);

app.listen(port, () => {
  console.log(`Server started on port ${port} 👌`);
});
