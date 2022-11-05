const app = require('../../app');
const request = require('supertest');
const db = require('../db');

describe('404', () => {
  afterEach(async () => {
    await db.clearDatabase();
  });

  afterAll(async () => {
    await db.closeDatabase();
  });

  describe('GET /ml', () => {
    it('should respond with a 404 status code', async () => {
      const response = await request(app).get('/404');
      expect(response.statusCode).toEqual(404);
      expect(response.body).toHaveProperty('error', 'Not Found');
    });
  });
});
