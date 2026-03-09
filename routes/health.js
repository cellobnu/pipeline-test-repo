const express = require('express');
const router = express.Router();
const { version } = require('../package.json');

const MAX_HEAP_MB = 512;

function performChecks() {
  const heapUsedMB = process.memoryUsage().heapUsed / 1024 / 1024;
  return {
    uptime: process.uptime() > 0,
    memory: heapUsedMB < MAX_HEAP_MB,
  };
}

router.get('/', (req, res) => {
  const checks = performChecks();
  const allHealthy = Object.values(checks).every(Boolean);

  const body = {
    status: allHealthy ? 'ok' : 'degraded',
    uptime: process.uptime(),
    version,
    timestamp: new Date().toISOString(),
  };

  res.status(allHealthy ? 200 : 503).json(body);
});

module.exports = router;
module.exports.performChecks = performChecks;
