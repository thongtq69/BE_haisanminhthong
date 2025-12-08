import { Request, Response } from 'express';
import BlogPost, { IBlogPost } from '../models/BlogPost';
import { slugify } from '../utils/slugify';
import mongoose from 'mongoose';

const buildFilters = (query: any, includeDraft = false) => {
  const filters: any = {};
  if (!includeDraft) {
    filters.status = 'published';
  } else if (query.status) {
    filters.status = query.status;
  }
  if (query.category) filters.category = query.category;
  if (query.tag) filters.tags = query.tag;
  if (query.search) {
    filters.$or = [
      { title: { $regex: query.search, $options: 'i' } },
      { excerpt: { $regex: query.search, $options: 'i' } },
      { content: { $regex: query.search, $options: 'i' } },
    ];
  }
  return filters;
};

export const getPosts = async (req: Request, res: Response) => {
  try {
  const { limit = 10, page = 1 } = req.query;
  const paginationLimit = Number(limit);
  const currentPage = Number(page);
  const skip = (currentPage - 1) * paginationLimit;
  const filters = buildFilters(req.query);

  const [items, total] = await Promise.all([
    BlogPost.find(filters).sort({ publishedAt: -1, createdAt: -1 }).skip(skip).limit(paginationLimit),
    BlogPost.countDocuments(filters),
  ]);

    return res.json({
      items,
      total,
      page: currentPage,
      limit: paginationLimit,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Failed to fetch blog posts' });
  }
};

export const getPostBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const post = await BlogPost.findOne({ slug, status: 'published' });
    if (!post) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }
    return res.json({ success: true, data: post });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Failed to fetch blog post' });
  }
};

const generateUniqueSlug = async (title: string, providedSlug?: string, excludeId?: string) => {
  let base = providedSlug || slugify(title);
  let slugCandidate = base;
  let counter = 1;
  const exclude = excludeId ? { _id: { $ne: new mongoose.Types.ObjectId(excludeId) } } : {};
  while (await BlogPost.exists({ slug: slugCandidate, ...exclude })) {
    counter += 1;
    slugCandidate = `${base}-${counter}`;
  }
  return slugCandidate;
};

// Admin side
export const adminGetPosts = async (req: Request, res: Response) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const paginationLimit = Number(limit);
    const currentPage = Number(page);
    const skip = (currentPage - 1) * paginationLimit;
    const filters = buildFilters(req.query, true);

    const [items, total] = await Promise.all([
      BlogPost.find(filters).sort({ createdAt: -1 }).skip(skip).limit(paginationLimit),
      BlogPost.countDocuments(filters),
    ]);

    return res.json({ items, total, page: currentPage, limit: paginationLimit });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Failed to fetch blog posts' });
  }
};

export const adminGetPostById = async (req: Request, res: Response) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Blog post not found' });
    return res.json({ success: true, data: post });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Failed to fetch blog post' });
  }
};

export const adminCreatePost = async (req: Request, res: Response) => {
  try {
    const { title, slug, content, status } = req.body as IBlogPost;
    if (!title || !content || !status) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const finalSlug = await generateUniqueSlug(title, slug);
    const shortDescription = (req.body as any).shortDescription || req.body.excerpt || '';
    const payload = {
      ...req.body,
      slug: finalSlug,
      shortDescription,
      seoTitle: req.body.seoTitle || title,
      seoDescription: req.body.seoDescription || shortDescription,
      publishedAt: req.body.status === 'published' && !req.body.publishedAt ? new Date() : req.body.publishedAt,
    };

    const post = await BlogPost.create(payload);
    return res.status(201).json({ success: true, data: post });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Failed to create blog post' });
  }
};

export const adminUpdatePost = async (req: Request, res: Response) => {
  try {
    const existing = await BlogPost.findById(req.params.id);
    if (!existing) return res.status(404).json({ success: false, message: 'Blog post not found' });

    const { title, slug, content, status } = req.body as IBlogPost;
    if (!title || !content || !status) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const finalSlug = await generateUniqueSlug(title, slug, existing._id.toString());
    const shortDescription = (req.body as any).shortDescription || req.body.excerpt || existing.shortDescription || '';
    const payload = {
      ...req.body,
      slug: finalSlug,
      shortDescription,
      seoTitle: req.body.seoTitle || title,
      seoDescription: req.body.seoDescription || shortDescription,
      publishedAt:
        req.body.status === 'published' && !req.body.publishedAt ? existing.publishedAt || new Date() : req.body.publishedAt,
    };

    const post = await BlogPost.findByIdAndUpdate(req.params.id, payload, { new: true });
    return res.json({ success: true, data: post });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Failed to update blog post' });
  }
};

export const adminDeletePost = async (req: Request, res: Response) => {
  try {
    const deleted = await BlogPost.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Blog post not found' });
    return res.json({ success: true, message: 'Deleted' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Failed to delete blog post' });
  }
};
