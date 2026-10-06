import { Router } from 'express';
import { z } from 'zod';
import { authenticate, createToken, publicUser, register } from '../services/authService';
import { requireAuth } from '../middleware/auth';

const router = Router();
const credentials = z.object({ email: z.string().email(), password: z.string().min(8), displayName: z.string().min(2).max(60).optional() });
const cookieOptions = () => ({ httpOnly: true, sameSite: 'lax' as const, secure: process.env.COOKIE_SECURE === 'true', maxAge: 2 * 60 * 60 * 1000 });

router.post('/register', async (req, res) => {
  const parsed = credentials.safeParse(req.body);
  if (!parsed.success || !parsed.data.displayName) return res.status(400).json({ message: 'Valid email, password and displayName are required' });
  try { const user = await register(parsed.data.email, parsed.data.password, parsed.data.displayName); res.cookie('abbey_session', createToken(user.id), cookieOptions()); return res.status(201).json({ user: publicUser(user) }); }
  catch (e) { return res.status(409).json({ message: e instanceof Error ? e.message : 'Registration failed' }); }
});

router.post('/login', async (req, res) => {
  const parsed = credentials.pick({ email: true, password: true }).safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Valid email and password are required' });
  const user = await authenticate(parsed.data.email, parsed.data.password);
  if (!user) return res.status(401).json({ message: 'Invalid email or password' });
  res.cookie('abbey_session', createToken(user.id), cookieOptions()); return res.json({ user: publicUser(user) });
});

router.post('/logout', requireAuth, (_req, res) => { res.clearCookie('abbey_session', { httpOnly: true, sameSite: 'lax', secure: process.env.COOKIE_SECURE === 'true' }); return res.json({ message: 'Logged out' }); });
export default router;
