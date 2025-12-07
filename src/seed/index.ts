import dotenv from 'dotenv';
dotenv.config();

import { connectDb, disconnectDb } from './connectDb';
import { seedCategories } from './seedCategories';
import { seedProducts } from './seedProducts';
import { seedCombos } from './seedCombos';
import { seedBlogPosts } from './seedBlogPosts';
import { seedReviews } from './seedReviews';
import { sampleCategories } from './sampleCategories';
import { sampleProducts } from './sampleProducts';
import { sampleCombos } from './sampleCombos';
import { sampleReviews } from './sampleReviews';

const DROP_EXISTING = process.env.DROP_EXISTING === 'true';

const run = async () => {
  const start = Date.now();
  try {
    await connectDb();

    // Seed categories
    const categories = await seedCategories(DROP_EXISTING);
    const categoryMap = Object.fromEntries(categories.map((c) => [c.slug, c._id.toString()]));

    // Seed products
    const products = await seedProducts(categoryMap, DROP_EXISTING);
    const productMap = Object.fromEntries(products.map((p) => [p.slug, p._id.toString()]));

    // Seed combos
    await seedCombos(productMap, DROP_EXISTING);

    // Seed blog posts
    await seedBlogPosts(DROP_EXISTING);

    // Seed reviews
    await seedReviews(productMap, DROP_EXISTING);

    const elapsed = ((Date.now() - start) / 1000).toFixed(2);
    console.log('🎉 Seed completed successfully');
    console.log(`⏱️  Time: ${elapsed}s`);
    console.log(`Categories: ${sampleCategories.length}, Products: ${sampleProducts.length}, Combos: ${sampleCombos.length}, Reviews: ${sampleReviews.length}`);
    await disconnectDb();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    await disconnectDb();
    process.exit(1);
  }
};

run();
