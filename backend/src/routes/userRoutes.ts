import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { publicUser } from '../services/authService';
import { store } from '../store/memoryStore';
const router = Router(); router.use(requireAuth);
router.get('/', (req, res) => { const q = String(req.query.search || '').trim(); if (!q) return res.json({ users: [] }); return res.json({ users: store.searchUsers(q, req.userId!).map(publicUser) }); });
export default router;
