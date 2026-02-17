const request = require('supertest');
const app = require('../server');

describe('GET /hello', () => {
  it('should return hello world message', async () => {
    const response = await request(app)
      .get('/hello')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toEqual({ message: 'hello world' });
  });
});
