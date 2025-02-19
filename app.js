import express from "express";

import cookieParser from 'cookie-parser';

import { PORT } from './config/env.js'

import todoRouter from './routes/todo.route.js'
import authRouter from './routes/auth.routes.js'
import authMiddleware from './middleware/auth.middleware.js'

import errorMiddleware from './middleware/error.middleware.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/v1/todo', authMiddleware, todoRouter);
app.use('/api/v1/auth', authRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} http://localhost:${PORT}`);
});
