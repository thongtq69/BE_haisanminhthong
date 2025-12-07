import { Router } from 'express';
import { getCombos, getComboBySlug } from '../controllers/comboController';

const router = Router();

router.get('/', getCombos);
router.get('/:slug', getComboBySlug);

export default router;

