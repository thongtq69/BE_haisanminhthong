import mongoose from 'mongoose';
import { connectDB } from '../config/db';
import Category from '../models/Category';
import Product from '../models/Product';
import Combo from '../models/Combo';
import BlogPost from '../models/BlogPost';
import Review from '../models/Review';
import {
  categories,
  products,
  combos,
  blogPosts,
  reviews,
} from './mockData';

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    console.log('🗑️  Clearing existing data...');
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Combo.deleteMany({});
    await BlogPost.deleteMany({});
    await Review.deleteMany({});

    console.log('📦 Seeding categories...');
    const createdCategories = await Category.insertMany(categories);
    console.log(`✅ Created ${createdCategories.length} categories`);

    // Create category map for products
    const categoryMap: { [key: string]: mongoose.Types.ObjectId } = {};
    createdCategories.forEach((cat) => {
      if (cat.slug) {
        categoryMap[cat.slug] = cat._id;
      }
    });

    console.log('📦 Seeding products...');
    const productsWithCategory = products.map((product) => {
      // Map category based on product name/slug
      let categoryId = categoryMap['ghe-xanh']; // default
      if (product.slug?.includes('ghe-do')) {
        categoryId = categoryMap['ghe-do'];
      } else if (product.slug?.includes('ghe-sua')) {
        categoryId = categoryMap['ghe-sua'];
      } else if (product.slug?.includes('ghe-thit')) {
        categoryId = categoryMap['ghe-thit'];
      } else if (product.slug?.includes('combo')) {
        categoryId = categoryMap['combo-noel-gia-dinh'];
      }

      return {
        ...product,
        category: categoryId,
      };
    });

    const createdProducts = await Product.insertMany(productsWithCategory);
    console.log(`✅ Created ${createdProducts.length} products`);

    console.log('📦 Seeding combos...');
    // Add some products to combos
    const combosWithProducts = combos.map((combo, index) => {
      const productIds = createdProducts
        .slice(index * 2, index * 2 + 2)
        .map((p) => ({
          product: p._id,
          quantity: 1,
        }));

      return {
        ...combo,
        products: productIds.length > 0 ? productIds : [],
      };
    });

    const createdCombos = await Combo.insertMany(combosWithProducts);
    console.log(`✅ Created ${createdCombos.length} combos`);

    console.log('📦 Seeding blog posts...');
    const createdBlogPosts = await BlogPost.insertMany(blogPosts);
    console.log(`✅ Created ${createdBlogPosts.length} blog posts`);

    console.log('📦 Seeding reviews...');
    // Add reviews to first few products
    const reviewsToInsert: any[] = [];
    createdProducts.slice(0, 3).forEach((product, productIndex) => {
      reviews.slice(productIndex * 2, productIndex * 2 + 2).forEach((review) => {
        reviewsToInsert.push({
          ...review,
          product: product._id,
        });
      });
    });

    const createdReviews = await Review.insertMany(reviewsToInsert);
    console.log(`✅ Created ${createdReviews.length} reviews`);

    // Update product ratings based on reviews
    for (const product of createdProducts.slice(0, 3)) {
      const productReviews = await Review.find({ product: product._id });
      if (productReviews.length > 0) {
        const avgRating =
          productReviews.reduce((sum, r) => sum + r.rating, 0) /
          productReviews.length;
        await Product.updateOne(
          { _id: product._id },
          {
            avgRating: Math.round(avgRating * 10) / 10,
            reviewCount: productReviews.length,
          }
        );
      }
    }

    console.log('\n🎉 Seed completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - Categories: ${createdCategories.length}`);
    console.log(`   - Products: ${createdProducts.length}`);
    console.log(`   - Combos: ${createdCombos.length}`);
    console.log(`   - Blog Posts: ${createdBlogPosts.length}`);
    console.log(`   - Reviews: ${createdReviews.length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
};

seedDatabase();

