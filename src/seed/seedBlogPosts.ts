import BlogPost from '../models/BlogPost';
import { sampleBlogPosts } from './sampleBlogPosts';
import { slugify } from '../utils/slugify';

export const seedBlogPosts = async (drop = false) => {
  if (drop) {
    await BlogPost.deleteMany({});
    console.log('🗑️  Cleared blog posts');
  }
  const docs = sampleBlogPosts.map((p) => ({
    ...p,
    slug: p.slug || slugify(p.title || ''),
    coverImage: p.coverImage || (p as any).thumbnail,
  }));
  const inserted = await BlogPost.insertMany(docs);
  console.log(`✅ Seeded blog posts: ${inserted.length}`);
  return inserted;
};
