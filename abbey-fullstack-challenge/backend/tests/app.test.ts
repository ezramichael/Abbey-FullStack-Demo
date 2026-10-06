import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { app } from '../src/app';
import { store } from '../src/store/memoryStore';

describe('Abbey API', () => {
  beforeEach(() => store.reset());
  it('logs in and protects /api/me', async () => {
    const agent = request.agent(app);
    const login = await agent.post('/api/auth/login').send({ email:'abbeyuser1@example.com', password:'Password123!' });
    expect(login.status).toBe(200);
    const me = await agent.get('/api/me');
    expect(me.status).toBe(200); expect(me.body.user.email).toBe('abbeyuser1@example.com');
  });
  it('updates an account', async () => {
    const agent = request.agent(app); await agent.post('/api/auth/login').send({ email:'abbeyuser1@example.com', password:'Password123!' });
    const response = await agent.patch('/api/me').send({ displayName:'Abbey Updated', bio:'Hello Abbey' });
    expect(response.status).toBe(200); expect(response.body.user.displayName).toBe('Abbey Updated');
  });
  it('creates and accepts a relationship', async () => {
    const abbey = store.findUserByEmail('abbeyuser1@example.com')!; const abbey3 = store.findUserByEmail('abbeyuser3@example.com')!;
    const abbeyAgent = request.agent(app); await abbeyAgent.post('/api/auth/login').send({ email:abbey.email, password:'Password123!' });
    const created = await abbeyAgent.post(`/api/relationships/requests/${abbey3.id}`); expect(created.status).toBe(201);
    const abbey3Agent = request.agent(app); await abbey3Agent.post('/api/auth/login').send({ email:abbey3.email, password:'Password123!' });
    const accepted = await abbey3Agent.patch(`/api/relationships/requests/${abbey.id}`).send({ action:'accept' }); expect(accepted.status).toBe(200); expect(accepted.body.relationship.status).toBe('accepted');
  });
});
