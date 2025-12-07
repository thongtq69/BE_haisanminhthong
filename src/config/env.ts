import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/seafood_crab_shop',
  nodeEnv: process.env.NODE_ENV || 'development',
};

// Allowed origins for CORS
export const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://haisanminhthong.vercel.app',
];

