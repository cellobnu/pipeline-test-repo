const request = require('supertest');
const app = require('../server');

describe('GET /status', () => {
  it('should return status 200 when server is running', async () => {
    const response = await request(app)
      .get('/status')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toEqual({ status: 'ok' });
  });
});
