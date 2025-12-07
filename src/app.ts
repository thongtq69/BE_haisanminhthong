import express from 'express';
import cors from 'cors';
import { config } from './config/env';
import apiRouter from './routes';

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: config.frontendUrl,
    credentials: true,
  })
);

// API Routes
app.use('/api', apiRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

export default app;

