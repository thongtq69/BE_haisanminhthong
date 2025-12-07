import Combo from '../models/Combo';
import { sampleCombos } from './sampleCombos';
import { slugify } from '../utils/slugify';

export const seedCombos = async (
  productsMap: Record<string, string>,
  drop = false
) => {
  if (drop) {
    await Combo.deleteMany({});
    console.log('🗑️  Cleared combos');
  }

  const docs = sampleCombos.map((combo) => ({
    ...combo,
    slug: combo.slug || slugify(combo.name),
    products: combo.items.map((it) => ({
      product: productsMap[it.productSlug],
      quantity: it.quantity,
    })),
  }));

  const inserted = await Combo.insertMany(docs);
  console.log(`✅ Seeded combos: ${inserted.length}`);
  return inserted;
};
