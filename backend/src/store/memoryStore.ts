import { randomUUID } from 'crypto';
import bcrypt from 'bcryptjs';
import { Relationship, User } from '../types/models';

class MemoryStore {
  users = new Map<string, User>();
  relationships = new Map<string, Relationship>();

  seed() {
    if (this.users.size) return;
    const users = [
      ['abbeyuser1@example.com', 'Abbey1 User1', 'Product-minded software engineer.'],
      ['abbeyuser2@example.com', 'Abbey2 User2', 'Backend developer who enjoys APIs.'],
      ['abbeyuser3@example.com', 'Abbey3 User3', 'Frontend developer and designer.']
    ];
    for (const [email, displayName, bio] of users) {
      const user: User = { id: randomUUID(), email, passwordHash: bcrypt.hashSync('Password123!', 10), displayName, bio, createdAt: new Date().toISOString() };
      this.users.set(user.id, user);
    }
    const abbey1 = this.findUserByEmail('abbeyuser1@example.com')!;
    const abbey2 = this.findUserByEmail('abbeyuser2@example.com')!;
    this.createRelationship(abbey1.id, abbey2.id, 'accepted');
  }

  reset() { this.users.clear(); this.relationships.clear(); this.seed(); }
  findUserById(id: string) { return this.users.get(id); }
  findUserByEmail(email: string) { return [...this.users.values()].find(u => u.email.toLowerCase() === email.toLowerCase()); }
  searchUsers(query: string, excludeId: string) { const q = query.toLowerCase(); return [...this.users.values()].filter(u => u.id !== excludeId && (u.displayName.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))); }
  addUser(user: User) { this.users.set(user.id, user); }
  createRelationship(requesterId: string, recipientId: string, status: Relationship['status'] = 'pending') { const r: Relationship = { id: randomUUID(), requesterId, recipientId, status, createdAt: new Date().toISOString() }; this.relationships.set(r.id, r); return r; }
  findRelationship(a: string, b: string) { return [...this.relationships.values()].find(r => (r.requesterId === a && r.recipientId === b) || (r.requesterId === b && r.recipientId === a)); }
  relationshipsFor(userId: string) { return [...this.relationships.values()].filter(r => r.requesterId === userId || r.recipientId === userId); }
  deleteRelationship(a: string, b: string) { const r = this.findRelationship(a, b); if (r) this.relationships.delete(r.id); }
}

export const store = new MemoryStore();
