import { Router } from 'express';
import productRoutes from './productRoutes';
import categoryRoutes from './categoryRoutes';
import comboRoutes from './comboRoutes';
import blogRoutes from './blogRoutes';
import reviewRoutes from './reviewRoutes';
import orderRoutes from './orderRoutes';
import adminBlogRoutes from './adminBlogRoutes';

const router = Router();

// Review routes must be registered BEFORE product routes to avoid conflict
// /products/:productId/reviews must match before /products/:slug
router.use('/products', reviewRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/combos', comboRoutes);
router.use('/blog', blogRoutes);
router.use('/orders', orderRoutes);
router.use('/admin/blog', adminBlogRoutes);

export default router;
