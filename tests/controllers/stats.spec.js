const app = require('../../app');
const request = require('supertest');
const db = require('../db');

describe('stats', () => {
  afterEach(async () => {
    await db.clearDatabase();
  });

  afterAll(async () => {
    await db.closeDatabase();
  });

  describe('GET /index', () => {
    describe('there are records', () => {
      beforeEach(async () => {
        const mutantDna = ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCGA', 'TCACTG'];
        await request(app).post('/mutant').send({ dna: mutantDna });
        await request(app).post('/mutant').send({ dna: mutantDna });
        await request(app).post('/mutant').send({ dna: ['AC', 'GT'] });
        await request(app).post('/mutant').send({ dna: ['CC', 'GT'] });
        await request(app).post('/mutant').send({ dna: ['CA', 'AT'] });
      });

      it('should respond with a 200 status code', async () => {
        const response = await request(app).get('/stats');
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('count_mutant_dna', 1);
        expect(response.body).toHaveProperty('count_human_dna', 4);
        expect(response.body).toHaveProperty('ratio', 1 / 4);
      });
    });


    describe("there aren't records", () => {
      it('should respond with a 200 status code', async () => {
        const response = await request(app).get('/stats');
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('count_mutant_dna', 0);
        expect(response.body).toHaveProperty('count_human_dna', 0);
        expect(response.body).toHaveProperty('ratio', 0);
      });
    });
  });
});
