import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
const cors = require('cors');
import routes from './routes';
import globallyErrors from './middlewares/globallyErrors';

import './container';

const port = 3333;
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(globallyErrors);

app.listen(port, () => {
  console.log(`Server started on port ${port} 👌`);
});
