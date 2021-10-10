const express = require('express');
const devicesRouter = require('./src/routes/devices');
const categoriesRoute = require('./src/routes/categories');

const app = express();

// Middlewares Section
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
// End Section

app.get('/api', (req, res) => {
  res.send({ version : process.env.API_VERSION });
});

app.use('/api', devicesRouter);
app.use('/api', categoriesRoute);

module.exports = app;
