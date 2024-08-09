import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { routes } from './app/routes/routes';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { notFound } from './app/middlewares/notFound';
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: 'https://quickshop-kohl.vercel.app', // Specify the exact origin
    credentials: true,
  }),
);
app.use(cookieParser());

app.use('/api/v1', routes);

app.use(globalErrorHandler);
app.use(notFound);

export { app };
