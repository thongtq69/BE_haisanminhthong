import mongoose from 'mongoose';
import { config } from './env';

/**
 * Sanitize connection string to avoid duplicate query params (e.g. `w` twice)
 */
const sanitizeMongoUri = (uri: string): string => {
  try {
    const url = new URL(uri);
    // Keep only the first value for "w" to avoid MongoInvalidArgumentError
    const wValues = url.searchParams.getAll('w');
    if (wValues.length > 1) {
      url.searchParams.delete('w');
      url.searchParams.append('w', wValues[0]);
    }
    return url.toString();
  } catch {
    return uri;
  }
};

export const connectDB = async (): Promise<void> => {
  try {
    const uri = sanitizeMongoUri(config.mongodbUri);
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};
