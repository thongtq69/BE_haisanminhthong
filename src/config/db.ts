import mongoose from 'mongoose';
import { config } from './env';

/**
 * Sanitize connection string to avoid duplicate query params (e.g. `w`, `appName`).
 * Keeps only the first value for each param.
 */
const sanitizeMongoUri = (uri: string): string => {
  try {
    if (!uri) return '';
    if (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
      return '';
    }
    const url = new URL(uri);
    const paramsToDedup = ['w', 'appName'];

    paramsToDedup.forEach((key) => {
      const values = url.searchParams.getAll(key);
      if (values.length > 1) {
        url.searchParams.delete(key);
        url.searchParams.append(key, values[0]);
      }
    });

    // Generic dedup: if any other param appears multiple times, keep first.
    for (const [key] of url.searchParams) {
      const values = url.searchParams.getAll(key);
      if (values.length > 1) {
        url.searchParams.delete(key);
        url.searchParams.append(key, values[0]);
      }
    }

    return url.toString();
  } catch {
    return uri;
  }
};

export const connectDB = async (): Promise<void> => {
  try {
    const uri = sanitizeMongoUri(config.mongodbUri);
    if (!uri) {
      throw new Error('Missing or invalid MONGODB_URI (must start with mongodb:// or mongodb+srv://)');
    }
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};
