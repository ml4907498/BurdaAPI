import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';

import morgan from 'morgan';
import router from './routes';

const PORT = process.env.PORT || 3000;

const app = express();

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

// app.use(Router);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});

const MONGO_URL =
  'mongodb+srv://Kehong:aifaulBkMUeEdqdc@cluster0.ppfgtos.mongodb.net/?retryWrites=true&w=majority';

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router());
