const request = require('supertest');
const app = require('../../src/server'); 
const prisma = require('../../src/config/prisma.database');

describe('Authentication Integration Tests', () => {
  
  beforeAll(async () => {
    await prisma.like.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('User Registration (/auth/register)', () => {
    
    it('should register a new user successfully', async () => {
      const res = await request(app).post('/auth/register').send({
          username: 'test_user',
          password: 'password123' 
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('username', 'test_user');
    });

    it('should return 409 Conflict if username already exists', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          username: 'test_user', 
          password: 'newpassword123'
        });

      expect(res.statusCode).toBe(409);
    });

    it('should return 400 Bad Request for invariant violation (password < 6 chars)', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          username: 'short_pass_user',
          password: '123' 
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toContain('at least 6 characters');
    });
  });

  describe('User Login (/auth/login)', () => {
    
    it('should login user successfully and set JWT cookie', async () => {
      const res = await request(app)
        .post('/auth/login') 
        .send({
          username: 'test_user',
          password: 'password123' 
        });

      expect(res.statusCode).toBe(200);
      const cookies = res.headers['set-cookie'];
      expect(cookies).toBeDefined();
      expect(cookies.some(cookie => cookie.startsWith('jwt='))).toBe(true);
    });

    it('should return 401 Unauthorized for wrong password', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          username: 'test_user',
          password: 'wrongpassword'
        });

      expect(res.statusCode).toBe(401);
    });

    it('should return 401 Unauthorized for non-existent user', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          username: 'nobody_user',
          password: 'password123'
        });

      expect(res.statusCode).toBe(401);
    });
  });
});