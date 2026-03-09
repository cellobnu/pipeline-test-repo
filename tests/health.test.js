const request = require('supertest');
const app = require('../server');
const { version } = require('../package.json');
const { performChecks } = require('../routes/health');

describe('GET /health', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return 200 with all required metrics when healthy', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body.status).toBe('ok');
    expect(typeof response.body.uptime).toBe('number');
    expect(response.body.uptime).toBeGreaterThan(0);
    expect(response.body.version).toBe(version);
    expect(typeof response.body.timestamp).toBe('string');
    expect(new Date(response.body.timestamp).toString()).not.toBe('Invalid Date');
  });

  it('should return 503 when uptime check fails', async () => {
    jest.spyOn(process, 'uptime').mockReturnValue(0);

    const response = await request(app)
      .get('/health')
      .expect(503)
      .expect('Content-Type', /json/);

    expect(response.body.status).toBe('degraded');
    expect(response.body).toHaveProperty('uptime');
    expect(response.body).toHaveProperty('version');
    expect(response.body).toHaveProperty('timestamp');
  });

  it('should return 503 when memory check fails', async () => {
    jest.spyOn(process, 'memoryUsage').mockReturnValue({
      heapUsed: 600 * 1024 * 1024,
      heapTotal: 700 * 1024 * 1024,
      external: 0,
      arrayBuffers: 0,
      rss: 700 * 1024 * 1024,
    });

    const response = await request(app)
      .get('/health')
      .expect(503)
      .expect('Content-Type', /json/);

    expect(response.body.status).toBe('degraded');
  });

  it('should include all required fields in the response', async () => {
    const response = await request(app).get('/health').expect(200);

    ['status', 'uptime', 'version', 'timestamp'].forEach((field) => {
      expect(response.body).toHaveProperty(field);
    });
  });

  describe('performChecks()', () => {
    it('should return true for uptime when process has been running', () => {
      const checks = performChecks();
      expect(checks.uptime).toBe(true);
    });

    it('should return false for uptime when process.uptime returns 0', () => {
      jest.spyOn(process, 'uptime').mockReturnValue(0);
      const checks = performChecks();
      expect(checks.uptime).toBe(false);
    });

    it('should return false for memory when heap exceeds threshold', () => {
      jest.spyOn(process, 'memoryUsage').mockReturnValue({
        heapUsed: 600 * 1024 * 1024,
        heapTotal: 700 * 1024 * 1024,
        external: 0,
        arrayBuffers: 0,
        rss: 700 * 1024 * 1024,
      });
      const checks = performChecks();
      expect(checks.memory).toBe(false);
    });
  });
});
