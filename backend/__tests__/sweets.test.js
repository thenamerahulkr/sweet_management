const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../server');
const User = require('../models/User');
const Sweet = require('../models/Sweet');

let mongoServer;
let userToken;
let adminToken;
let testSweet;

// Set up test environment variables
process.env.JWT_SECRET = 'test-jwt-secret-key';
process.env.NODE_ENV = 'test';

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);

  // Create test users and get tokens
  const userResponse = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Test User',
      email: 'user@test.com',
      password: 'password123',
      role: 'USER'
    });
  userToken = userResponse.body.data.token;

  const adminResponse = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Test Admin',
      email: 'admin@test.com',
      password: 'password123',
      role: 'ADMIN'
    });
  adminToken = adminResponse.body.data.token;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Sweet.deleteMany({});
  
  // Create a test sweet
  testSweet = await Sweet.create({
    name: 'Chocolate Bar',
    category: 'Chocolate',
    price: 2.99,
    quantity: 10,
    description: 'Delicious milk chocolate bar'
  });
});

describe('Sweet Routes', () => {
  describe('POST /api/sweets', () => {
    it('should create a new sweet with valid data', async () => {
      const sweetData = {
        name: 'Gummy Bears',
        category: 'Gummy',
        price: 1.99,
        quantity: 50,
        description: 'Colorful gummy bears'
      };

      const response = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${userToken}`)
        .send(sweetData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(sweetData.name);
      expect(response.body.data.category).toBe(sweetData.category);
      expect(response.body.data.price).toBe(sweetData.price);
      expect(response.body.data.quantity).toBe(sweetData.quantity);
    });

    it('should not create sweet without authentication', async () => {
      const sweetData = {
        name: 'Gummy Bears',
        category: 'Gummy',
        price: 1.99,
        quantity: 50
      };

      const response = await request(app)
        .post('/api/sweets')
        .send(sweetData)
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('token');
    });

    it('should not create sweet with invalid data', async () => {
      const sweetData = {
        name: 'A', // Too short
        category: 'InvalidCategory',
        price: -1, // Negative price
        quantity: 50
      };

      const response = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${userToken}`)
        .send(sweetData)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/sweets', () => {
    it('should get all sweets with authentication', async () => {
      const response = await request(app)
        .get('/api/sweets')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('should not get sweets without authentication', async () => {
      const response = await request(app)
        .get('/api/sweets')
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/sweets/search', () => {
    it('should search sweets by name', async () => {
      const response = await request(app)
        .get('/api/sweets/search?name=Chocolate')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should search sweets by category', async () => {
      const response = await request(app)
        .get('/api/sweets/search?category=Chocolate')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should search sweets by price range', async () => {
      const response = await request(app)
        .get('/api/sweets/search?minPrice=1&maxPrice=5')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('PUT /api/sweets/:id', () => {
    it('should update sweet with valid data', async () => {
      const updateData = {
        name: 'Updated Chocolate Bar',
        price: 3.99
      };

      const response = await request(app)
        .put(`/api/sweets/${testSweet._id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(updateData.name);
      expect(response.body.data.price).toBe(updateData.price);
    });

    it('should not update sweet without authentication', async () => {
      const updateData = { name: 'Updated Name' };

      const response = await request(app)
        .put(`/api/sweets/${testSweet._id}`)
        .send(updateData)
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it('should not update non-existent sweet', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const updateData = { name: 'Updated Name' };

      const response = await request(app)
        .put(`/api/sweets/${fakeId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(updateData)
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  describe('DELETE /api/sweets/:id', () => {
    it('should delete sweet as admin', async () => {
      const response = await request(app)
        .delete(`/api/sweets/${testSweet._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('deleted');
    });

    it('should not delete sweet as regular user', async () => {
      const response = await request(app)
        .delete(`/api/sweets/${testSweet._id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(403);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Admin');
    });

    it('should not delete sweet without authentication', async () => {
      const response = await request(app)
        .delete(`/api/sweets/${testSweet._id}`)
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/sweets/:id/purchase', () => {
    it('should purchase sweet with sufficient quantity', async () => {
      const purchaseData = { quantity: 2 };

      const response = await request(app)
        .post(`/api/sweets/${testSweet._id}/purchase`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(purchaseData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.quantity).toBe(testSweet.quantity - purchaseData.quantity);
    });

    it('should not purchase sweet with insufficient quantity', async () => {
      const purchaseData = { quantity: 20 }; // More than available

      const response = await request(app)
        .post(`/api/sweets/${testSweet._id}/purchase`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(purchaseData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Insufficient');
    });

    it('should not purchase sweet without authentication', async () => {
      const purchaseData = { quantity: 2 };

      const response = await request(app)
        .post(`/api/sweets/${testSweet._id}/purchase`)
        .send(purchaseData)
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/sweets/:id/restock', () => {
    it('should restock sweet as admin', async () => {
      const restockData = { quantity: 5 };

      const response = await request(app)
        .post(`/api/sweets/${testSweet._id}/restock`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(restockData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.quantity).toBe(testSweet.quantity + restockData.quantity);
    });

    it('should not restock sweet as regular user', async () => {
      const restockData = { quantity: 5 };

      const response = await request(app)
        .post(`/api/sweets/${testSweet._id}/restock`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(restockData)
        .expect(403);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Admin');
    });

    it('should not restock sweet without authentication', async () => {
      const restockData = { quantity: 5 };

      const response = await request(app)
        .post(`/api/sweets/${testSweet._id}/restock`)
        .send(restockData)
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });
});