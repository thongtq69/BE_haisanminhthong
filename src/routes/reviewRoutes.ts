import { Router } from 'express';
import { getProductReviews, createReview } from '../controllers/reviewController';

const router = Router();

router.get('/:productId/reviews', getProductReviews);
router.post('/:productId/reviews', createReview);

export default router;

