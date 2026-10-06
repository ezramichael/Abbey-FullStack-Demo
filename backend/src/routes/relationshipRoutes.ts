import { Router } from 'express';
import { z } from 'zod';
import { requireAuth } from '../middleware/auth';
import { publicUser } from '../services/authService';
import { store } from '../store/memoryStore';

const router = Router(); router.use(requireAuth);
function relationshipView(r: any, currentUserId: string) { const otherId = r.requesterId === currentUserId ? r.recipientId : r.requesterId; const other = store.findUserById(otherId)!; return { id: r.id, status: r.status, direction: r.requesterId === currentUserId ? 'outgoing' : 'incoming', user: publicUser(other), createdAt: r.createdAt }; }
router.get('/', (req, res) => { const current = req.userId!; const all = store.relationshipsFor(current).map(r => relationshipView(r, current)); return res.json({ relationships: all }); });
router.post('/requests/:userId', (req, res) => { const current = req.userId!, target = req.params.userId; if (!store.findUserById(target)) return res.status(404).json({ message: 'User not found' }); if (current === target) return res.status(400).json({ message: 'You cannot connect with yourself' }); const existing = store.findRelationship(current, target); if (existing) return res.status(409).json({ message: 'A relationship already exists' }); const r = store.createRelationship(current, target); return res.status(201).json({ relationship: relationshipView(r, current) }); });
router.patch('/requests/:userId', (req, res) => { const parsed = z.object({ action: z.enum(['accept','reject']) }).safeParse(req.body); if (!parsed.success) return res.status(400).json({ message: 'action must be accept or reject' }); const current = req.userId!, target = req.params.userId; const r = store.findRelationship(target, current); if (!r || r.recipientId !== current || r.status !== 'pending') return res.status(404).json({ message: 'Pending incoming request not found' }); r.status = parsed.data.action === 'accept' ? 'accepted' : 'rejected'; return res.json({ relationship: relationshipView(r, current) }); });
router.delete('/:userId', (req, res) => { const target = req.params.userId; const r = store.findRelationship(req.userId!, target); if (!r) return res.status(404).json({ message: 'Relationship not found' }); store.deleteRelationship(req.userId!, target); return res.json({ message: 'Relationship removed' }); });
export default router;
