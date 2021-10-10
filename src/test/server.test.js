require('dotenv').config();
const request = require('supertest');
const app = require('../../server');

describe('Testing API Routes', () => {
  it(`should reach the root route /api`, async () => {
    await request(app)
      .get('/api')
      .expect(200);
  });

  it(`should reach the devices route /api/devices`, async () => {});

  it(`should reach the categories route /api/categories`, async () => {});
});

describe('Testing CRUD Operations', () => {
  it('should get all devices and their properties', async () => {});

  it('should insert a new device record successfully', async () => {});

  it('should delete a device record successfully', async () => {});

  it('should get all categories and their properties', async () => {});

  it('should insert a new category record successfully', async () => {});

  it('should delete a category record successfully', async () => {});
});