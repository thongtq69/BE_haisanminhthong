import mongoose from 'mongoose';
import { config } from '../config/env';

export const connectDb = async () => {
  const uri = process.env.MONGODB_URI || config.mongodbUri;
  await mongoose.connect(uri);
  console.log('✅ MongoDB connected');
};

export const disconnectDb = async () => {
  await mongoose.disconnect();
};
