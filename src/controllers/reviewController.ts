import { Request, Response } from 'express';
import Review from '../models/Review';
import Product from '../models/Product';

export const getProductReviews = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { limit = 10 } = req.query;

    const reviews = await Review.find({ product: productId })
      .sort({ createdAt: -1 })
      .limit(Number(limit));

    res.json({
      data: reviews,
      meta: {
        total: reviews.length,
      },
      error: null,
    });
  } catch (error: any) {
    res.status(500).json({
      data: null,
      error: error.message || 'Failed to fetch reviews',
    });
  }
};

export const createReview = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { authorName, rating, comment } = req.body;

    // Validation
    if (!authorName || !rating || !comment) {
      return res.status(400).json({
        data: null,
        error: 'Missing required fields: authorName, rating, comment',
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        data: null,
        error: 'Rating must be between 1 and 5',
      });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        data: null,
        error: 'Product not found',
      });
    }

    // Create review
    const review = new Review({
      product: productId,
      authorName,
      rating: Number(rating),
      comment,
    });

    await review.save();

    // Update product rating
    const allReviews = await Review.find({ product: productId });
    const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = totalRating / allReviews.length;

    product.avgRating = Math.round(avgRating * 10) / 10;
    product.reviewCount = allReviews.length;
    await product.save();

    res.status(201).json({
      data: review,
      message: 'Review created successfully',
      error: null,
    });
  } catch (error: any) {
    res.status(500).json({
      data: null,
      error: error.message || 'Failed to create review',
    });
  }
};

