const express = require('express');
const devicesRouter = require('./src/routes/devices');
const categoriesRoute = require('./src/routes/categories');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api', devicesRouter);
app.use('/api', categoriesRoute);

app.get('/api', (req, res) => {
  res.send(JSON.stringify({ version : process.env.API_VERSION }));
});

module.exports = app;
