const app = require('./server');

const port = process.env.API_PORT || 3000;
const hostname = process.env.API_HOST || 'localhost';

app.listen(port, hostname, () => {
  console.log(`API is running at ${hostname}:${port}`);
});