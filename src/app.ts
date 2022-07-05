/* eslint-disable import/first */
import express from 'express';
// eslint-disable-next-line import/newline-after-import
require('express-async-errors');
import path from 'path';
import cors from 'cors';

import './container';
import routes from './routes';
import handleErrors from './middleware/handleErrors';

const app = express();

app.use(cors({}));
app.use(express.json());
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);

app.use(routes);

app.use(handleErrors);


export { app };
