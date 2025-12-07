import { Request, Response } from 'express';
import Category from '../models/Category';

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

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json({
      data: categories,
      meta: {
        total: categories.length,
      },
      error: null,
    });
  } catch (error: any) {
    res.status(500).json({
      data: null,
      error: error.message || 'Failed to fetch categories',
    });
  }
};

export const getCategoryBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOne({ slug });

    if (!category) {
      return res.status(404).json({
        data: null,
        error: 'Category not found',
      });
    }

    res.json({
      data: category,
      error: null,
    });
  } catch (error: any) {
    res.status(500).json({
      data: null,
      error: error.message || 'Failed to fetch category',
    });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        data: null,
        error: 'Category not found',
      });
    }

    res.json({
      data: category,
      error: null,
    });
  } catch (error: any) {
    res.status(500).json({
      data: null,
      error: error.message || 'Failed to fetch category',
    });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, slug, description, icon, image, images } = req.body;

    // Validation
    if (!name) {
      return res.status(400).json({
        data: null,
        error: 'Name is required',
      });
    }

    // Generate slug if not provided
    const finalSlug = slug || generateSlug(name);

    // Check if slug already exists
    const existingCategory = await Category.findOne({ slug: finalSlug });
    if (existingCategory) {
      return res.status(400).json({
        data: null,
        error: 'Category with this slug already exists',
      });
    }

    // Parse images from string / array
    let imagesArray: string[] = [];
    if (images) {
      if (typeof images === 'string') {
        imagesArray = images
          .split(/\n|,/)
          .map((img: string) => img.trim())
          .filter(Boolean);
      } else if (Array.isArray(images)) {
        imagesArray = images;
      }
    }

    const category = new Category({
      name,
      slug: finalSlug,
      description,
      icon,
      image: image || imagesArray[0],
      images: imagesArray,
    });

    await category.save();

    res.status(201).json({
      data: category,
      message: 'Category created successfully',
      error: null,
    });
  } catch (error: any) {
    res.status(500).json({
      data: null,
      error: error.message || 'Failed to create category',
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, slug, description, icon, image, images } = req.body;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        data: null,
        error: 'Category not found',
      });
    }

    // Update fields
    if (name) category.name = name;
    if (slug) {
      // Check if new slug conflicts with another category
      const existingCategory = await Category.findOne({ slug, _id: { $ne: id } });
      if (existingCategory) {
        return res.status(400).json({
          data: null,
          error: 'Category with this slug already exists',
        });
      }
      category.slug = slug;
    } else if (name && !slug) {
      // Regenerate slug if name changed but slug not provided
      category.slug = generateSlug(name);
    }
    if (description !== undefined) category.description = description;
    if (icon !== undefined) category.icon = icon;
    if (image !== undefined) category.image = image;

    // Parse images if provided
    if (images !== undefined) {
      if (typeof images === 'string') {
        category.images = images
          .split(/\n|,/)
          .map((img: string) => img.trim())
          .filter(Boolean);
      } else if (Array.isArray(images)) {
        category.images = images;
      }

      // If no cover image but have gallery, pick the first one as cover
      if (!category.image && category.images && category.images.length > 0) {
        category.image = category.images[0];
      }
    } else if (!category.images) {
      category.images = [];
    }

    await category.save();

    res.json({
      data: category,
      message: 'Category updated successfully',
      error: null,
    });
  } catch (error: any) {
    res.status(500).json({
      data: null,
      error: error.message || 'Failed to update category',
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        data: null,
        error: 'Category not found',
      });
    }

    // TODO: Check if any products are using this category
    // For now, allow deletion
    await Category.findByIdAndDelete(id);

    res.json({
      data: null,
      message: 'Category deleted successfully',
      error: null,
    });
  } catch (error: any) {
    res.status(500).json({
      data: null,
      error: error.message || 'Failed to delete category',
    });
  }
};
