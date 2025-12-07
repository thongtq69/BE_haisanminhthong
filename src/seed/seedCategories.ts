import Category from '../models/Category';
import { sampleCategories } from './sampleCategories';

export const seedCategories = async (drop = false) => {
  if (drop) {
    await Category.deleteMany({});
    console.log('🗑️  Cleared categories');
  }
  const inserted = await Category.insertMany(sampleCategories);
  console.log(`✅ Seeded categories: ${inserted.length}`);
  return inserted;
};
