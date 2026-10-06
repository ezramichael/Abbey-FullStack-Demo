import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../services/authService';
import { store } from '../store/memoryStore';

declare global { namespace Express { interface Request { userId?: string } } }

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.abbey_session;
    if (!token) return res.status(401).json({ message: 'Authentication required' });
    const userId = verifyToken(token);
    if (!store.findUserById(userId)) return res.status(401).json({ message: 'User no longer exists' });
    req.userId = userId; next();
  } catch { return res.status(401).json({ message: 'Invalid or expired session' }); }
}
