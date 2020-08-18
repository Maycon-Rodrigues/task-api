import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import router from './routes';

const app = express();
createConnection();

app.use(express.json());
app.use(router);

app.listen(3333);
