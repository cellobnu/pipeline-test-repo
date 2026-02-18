const request = require('supertest');
const app = require('../server');

describe('GET /health', () => {
  it('should return status 200 when server is healthy', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toEqual({ status: 'ok' });
  });
});
