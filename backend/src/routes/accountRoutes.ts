import { Router } from 'express';
import { z } from 'zod';
import { requireAuth } from '../middleware/auth';
import { publicUser } from '../services/authService';
import { store } from '../store/memoryStore';

const router = Router();
router.use(requireAuth);
router.get('/', (req, res) => { const user = store.findUserById(req.userId!); return res.json({ user: publicUser(user!) }); });
router.patch('/', (req, res) => {
  const parsed = z.object({ displayName: z.string().min(2).max(60).optional(), bio: z.string().max(240).optional() }).safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid account data' });
  const user = store.findUserById(req.userId!); if (!user) return res.status(404).json({ message: 'User not found' });
  Object.assign(user, parsed.data); return res.json({ user: publicUser(user) });
});
export default router;
