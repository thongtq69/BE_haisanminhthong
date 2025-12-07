import { Request, Response } from 'express';
import Product from '../models/Product';
import Category from '../models/Category';
import Review from '../models/Review';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const {
      category,
      search,
      minPrice,
      maxPrice,
      sort = 'newest',
      limit = 12,
      page = 1,
    } = req.query;

    const query: any = {};

    // Filter by category
    if (category) {
      const categoryDoc = await Category.findOne({
        $or: [{ slug: category }, { _id: category }],
      });
      if (categoryDoc) {
        query.category = categoryDoc._id;
      }
    }

    // Search by name or tags
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { tags: { $regex: search as string, $options: 'i' } },
      ];
    }

    // Price filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Sort
    let sortOption: any = { createdAt: -1 };
    switch (sort) {
      case 'price_asc':
        sortOption = { price: 1 };
        break;
      case 'price_desc':
        sortOption = { price: -1 };
        break;
      case 'newest':
        sortOption = { createdAt: -1 };
        break;
      case 'rating':
        sortOption = { avgRating: -1 };
        break;
    }

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);
    const total = await Product.countDocuments(query);

    const products = await Product.find(query)
      .populate('category', 'name slug icon')
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    res.json({
      data: products,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
      error: null,
    });
  } catch (error: any) {
    res.status(500).json({
      data: null,
      error: error.message || 'Failed to fetch products',
    });
  }
};

export const getFeaturedProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({
      $or: [{ isOnSale: true }, { avgRating: { $gte: 4.5 } }],
      status: 'available',
    })
      .populate('category', 'name slug icon')
      .sort({ avgRating: -1, createdAt: -1 })
      .limit(12);

    res.json({
      data: products,
      meta: {
        total: products.length,
      },
      error: null,
    });
  } catch (error: any) {
    res.status(500).json({
      data: null,
      error: error.message || 'Failed to fetch featured products',
    });
  }
};

export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug }).populate(
      'category',
      'name slug icon description'
    );

    if (!product) {
      return res.status(404).json({
        data: null,
        error: 'Product not found',
      });
    }

    // Get recent reviews (5 latest)
    const recentReviews = await Review.find({ product: product._id })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      data: {
        ...product.toObject(),
        recentReviews,
      },
      error: null,
    });
  } catch (error: any) {
    res.status(500).json({
      data: null,
      error: error.message || 'Failed to fetch product',
    });
  }
};

// Helper function to generate slug from name
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with single
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate(
      'category',
      'name slug icon description'
    );

    if (!product) {
      return res.status(404).json({
        data: null,
        error: 'Product not found',
      });
    }

    res.json({
      data: product,
      error: null,
    });
  } catch (error: any) {
    res.status(500).json({
      data: null,
      error: error.message || 'Failed to fetch product',
    });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      slug,
      category,
      type,
      price,
      originalPrice,
      description,
      shortDescription,
      images,
      tags,
      origin,
      sizeOptions,
      weightOptions,
      status,
    } = req.body;

    // Validation
    if (!name) {
      return res.status(400).json({
        data: null,
        error: 'Name is required',
      });
    }

    if (!category) {
      return res.status(400).json({
        data: null,
        error: 'Category is required',
      });
    }

    if (price === undefined || price === null) {
      return res.status(400).json({
        data: null,
        error: 'Price is required',
      });
    }

    // Validate category exists
    const categoryDoc = await Category.findById(category);
    if (!categoryDoc) {
      return res.status(400).json({
        data: null,
        error: 'Category not found',
      });
    }

    // Generate slug if not provided
    const finalSlug = slug || generateSlug(name);

    // Check if slug already exists
    const existingProduct = await Product.findOne({ slug: finalSlug });
    if (existingProduct) {
      return res.status(400).json({
        data: null,
        error: 'Product with this slug already exists',
      });
    }

    // Auto set isOnSale if originalPrice > price
    let isOnSale = false;
    let salePercent = 0;
    if (originalPrice && originalPrice > price) {
      isOnSale = true;
      salePercent = Math.round(((originalPrice - price) / originalPrice) * 100);
    }

    // Parse tags if string
    let tagsArray: string[] = [];
    if (tags) {
      if (typeof tags === 'string') {
        tagsArray = tags.split(',').map((t) => t.trim()).filter(Boolean);
      } else if (Array.isArray(tags)) {
        tagsArray = tags;
      }
    }

    // Parse images if string
    let imagesArray: string[] = [];
    if (images) {
      if (typeof images === 'string') {
        imagesArray = images.split(/\n|,/).map((img) => img.trim()).filter(Boolean);
      } else if (Array.isArray(images)) {
        imagesArray = images;
      }
    }

    const product = new Product({
      name,
      slug: finalSlug,
      category,
      type: type || 'crab',
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      isOnSale,
      salePercent: isOnSale ? salePercent : undefined,
      description: description || shortDescription || '',
      shortDescription: shortDescription || description || '',
      images: imagesArray,
      tags: tagsArray,
      origin,
      sizeOptions,
      weightOptions,
      status: status || 'available',
      avgRating: 0,
      reviewCount: 0,
    });

    await product.save();

    const populatedProduct = await Product.findById(product._id).populate(
      'category',
      'name slug icon'
    );

    res.status(201).json({
      data: populatedProduct,
      message: 'Product created successfully',
      error: null,
    });
  } catch (error: any) {
    res.status(500).json({
      data: null,
      error: error.message || 'Failed to create product',
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      name,
      slug,
      category,
      type,
      price,
      originalPrice,
      description,
      shortDescription,
      images,
      tags,
      origin,
      sizeOptions,
      weightOptions,
      status,
    } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        data: null,
        error: 'Product not found',
      });
    }

    // Validate category if provided
    if (category) {
      const categoryDoc = await Category.findById(category);
      if (!categoryDoc) {
        return res.status(400).json({
          data: null,
          error: 'Category not found',
        });
      }
      product.category = category;
    }

    // Update fields
    if (name) {
      product.name = name;
      // Regenerate slug if name changed and slug not provided
      if (!slug) {
        product.slug = generateSlug(name);
      }
    }

    if (slug) {
      // Check if new slug conflicts with another product
      const existingProduct = await Product.findOne({ slug, _id: { $ne: id } });
      if (existingProduct) {
        return res.status(400).json({
          data: null,
          error: 'Product with this slug already exists',
        });
      }
      product.slug = slug;
    }

    if (type) product.type = type;
    if (price !== undefined) product.price = Number(price);
    if (originalPrice !== undefined) {
      product.originalPrice = originalPrice ? Number(originalPrice) : undefined;
    }

    // Recalculate isOnSale and salePercent
    if (originalPrice && product.price < originalPrice) {
      product.isOnSale = true;
      product.salePercent = Math.round(
        ((originalPrice - product.price) / originalPrice) * 100
      );
    } else if (originalPrice === null || originalPrice === undefined) {
      product.isOnSale = false;
      product.salePercent = undefined;
    }

    if (description !== undefined) product.description = description;
    if (shortDescription !== undefined) product.shortDescription = shortDescription;
    if (origin !== undefined) product.origin = origin;
    if (status) product.status = status;

    // Parse tags
    if (tags !== undefined) {
      if (typeof tags === 'string') {
        product.tags = tags.split(',').map((t) => t.trim()).filter(Boolean);
      } else if (Array.isArray(tags)) {
        product.tags = tags;
      }
    }

    // Parse images
    if (images !== undefined) {
      if (typeof images === 'string') {
        product.images = images.split(/\n|,/).map((img) => img.trim()).filter(Boolean);
      } else if (Array.isArray(images)) {
        product.images = images;
      }
    }

    if (sizeOptions !== undefined) product.sizeOptions = sizeOptions;
    if (weightOptions !== undefined) product.weightOptions = weightOptions;

    await product.save();

    const populatedProduct = await Product.findById(product._id).populate(
      'category',
      'name slug icon'
    );

    res.json({
      data: populatedProduct,
      message: 'Product updated successfully',
      error: null,
    });
  } catch (error: any) {
    res.status(500).json({
      data: null,
      error: error.message || 'Failed to update product',
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        data: null,
        error: 'Product not found',
      });
    }

    // TODO: Optionally delete related reviews
    // For now, keep reviews but product will be deleted
    await Product.findByIdAndDelete(id);

    res.json({
      data: null,
      message: 'Product deleted successfully',
      error: null,
    });
  } catch (error: any) {
    res.status(500).json({
      data: null,
      error: error.message || 'Failed to delete product',
    });
  }
};
