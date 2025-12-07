import { Router } from 'express';
import {
  adminCreatePost,
  adminDeletePost,
  adminGetPostById,
  adminGetPosts,
  adminUpdatePost,
} from '../controllers/blogController';

const router = Router();

router.get('/', adminGetPosts);
router.get('/:id', adminGetPostById);
router.post('/', adminCreatePost);
router.put('/:id', adminUpdatePost);
router.delete('/:id', adminDeletePost);

export default router;
