import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { store } from '../store/memoryStore';
import { User } from '../types/models';

const secret = () => process.env.JWT_SECRET || 'local-development-secret';
export const publicUser = (user: User) => { const { passwordHash, ...safe } = user; return safe; };

export async function register(email: string, password: string, displayName: string) {
  if (store.findUserByEmail(email)) throw new Error('Email already registered');
  const user: User = { id: randomUUID(), email: email.toLowerCase(), passwordHash: await bcrypt.hash(password, 10), displayName, bio: '', createdAt: new Date().toISOString() };
  store.addUser(user); return user;
}

export async function authenticate(email: string, password: string) {
  const user = store.findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) return null;
  return user;
}

export function createToken(userId: string) { return jwt.sign({ sub: userId }, secret(), { expiresIn: '2h' }); }
export function verifyToken(token: string) { const payload = jwt.verify(token, secret()) as jwt.JwtPayload; if (!payload.sub) throw new Error('Invalid token'); return payload.sub; }
