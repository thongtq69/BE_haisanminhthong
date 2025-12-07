import { Router } from 'express';
import {
  getCategories,
  getCategoryBySlug,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController';

const router = Router();

// GET routes
router.get('/', getCategories);
router.get('/id/:id', getCategoryById); // Must be before /:slug to avoid conflict
router.get('/:slug', getCategoryBySlug);

// Admin CRUD routes
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;

