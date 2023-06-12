import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';

import morgan from 'morgan';
import router from './routes';
import { initDB } from './helpers';

dotenv.config();

const PORT = process.env.PORT || 3000;

console.log(process.env.MONGODB_URI);
const app = express();

initDB(process.env);

app.use(
  cors({
    credentials: true,
  }),
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.get('/', async (req, res) => {
  res.send('hello world!');
});

app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('public'));

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});

app.use('/', router());
