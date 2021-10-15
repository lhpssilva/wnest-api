const express = require('express');
const devicesRouter = require('./src/routes/devices');
const categoriesRoute = require('./src/routes/categories');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.use('/api', devicesRouter);
app.use('/api', categoriesRoute);

app.get('/api', (req, res) => {
  res.send(JSON.stringify({ version : process.env.API_VERSION }));
});

module.exports = app;
