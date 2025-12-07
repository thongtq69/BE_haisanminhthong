import Review from '../models/Review';
import { sampleReviews } from './sampleReviews';

export const seedReviews = async (
  productsMap: Record<string, string>,
  drop = false
) => {
  if (drop) {
    await Review.deleteMany({});
    console.log('🗑️  Cleared reviews');
  }
  const docs = sampleReviews.map((r) => ({
    ...r,
    product: productsMap[r.productSlug],
    createdAt: r.createdAt || new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
  }));
  const inserted = await Review.insertMany(docs);
  console.log(`✅ Seeded reviews: ${inserted.length}`);
  return inserted;
};
