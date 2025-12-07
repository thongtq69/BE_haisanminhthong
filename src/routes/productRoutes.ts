import { Router } from 'express';
import {
  getProducts,
  getFeaturedProducts,
  getProductBySlug,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';

const router = Router();

// GET routes - specific routes first
router.get('/featured', getFeaturedProducts);
router.get('/id/:id', getProductById); // Must be before /:slug to avoid conflict
router.get('/:slug', getProductBySlug);
router.get('/', getProducts);

// Admin CRUD routes
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;

