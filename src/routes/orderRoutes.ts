import { Router } from 'express';
import { createGuestOrder, getOrderById, getOrders } from '../controllers/orderController';

const router = Router();

router.post('/guest', createGuestOrder);
router.get('/', getOrders);
router.get('/:id', getOrderById);

export default router;
