import express from 'express';
import cors from 'cors';
import { allowedOrigins } from './config/env';
import apiRouter from './routes';
import path from 'path';

const app = express();

// Middleware
app.use(express.json());

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow all origins for now to unblock FE; tighten later if needed
      callback(null, true);
    },
    credentials: true,
  })
);

// Serve uploads statically
const uploadsPath = path.join(process.cwd(), 'uploads');
app.use('/uploads', express.static(uploadsPath));

// API Routes
app.use('/api', apiRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

export default app;
