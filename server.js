const express = require('express');
const devicesRouter = require('./src/routes/devices');
const categoriesRoute = require('./src/routes/categories');

const app = express();

const port = process.env.API_PORT || 3000;
const hostname = process.env.API_HOST || 'localhost';

// Middlewares Section
app.use(express.json());
app.use(express.urlencoded())
app.use('/api', devicesRouter);
app.use('/api', categoriesRoute);
// End Section

app.get('/api', (req, res) => {
  res.send(JSON.stringify({ version: process.env.API_VERSION }));
});

app.listen(port, hostname, () => {
  console.log(`API is running at ${hostname}:${port}`);
});