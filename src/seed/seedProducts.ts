import Product from '../models/Product';
import { sampleProducts } from './sampleProducts';
import { slugify } from '../utils/slugify';

export const seedProducts = async (categoriesMap: Record<string, string>, drop = false) => {
  if (drop) {
    await Product.deleteMany({});
    console.log('🗑️  Cleared products');
  }

  const docs = sampleProducts.map((p) => ({
    ...p,
    slug: p.slug || slugify(p.name || ''),
    category: categoriesMap[p.categorySlug],
  }));

  const inserted = await Product.insertMany(docs);
  console.log(`✅ Seeded products: ${inserted.length}`);
  return inserted;
};
