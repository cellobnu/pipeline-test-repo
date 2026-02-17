const express = require('express');
const helloRouter = require('./routes/hello');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/hello', helloRouter);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
