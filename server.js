const express = require('express');
const helloRouter = require('./routes/hello');
const healthRouter = require('./routes/health');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/hello', helloRouter);
app.use('/health', healthRouter);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
