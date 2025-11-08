const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Crash = require('../models/dataModel');


beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }
});

// CRUD test
describe('POST /api/crashes', () => {
  it('should create a new crash', async () => {
    const newCrash = {
      properties: {
        TOTAL_VEHICLES: 2,
        WARD: "Ward 3"
      },
      geometry: {
        type: "Point",
        coordinates: [-77.0364, 38.8951]
      }
    };

    const res = await request(app)
      .post('/api/crashes')
      .send(newCrash)
      .set('Content-Type', 'application/json');

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('properties');
    expect(res.body.properties.TOTAL_VEHICLES).toBe(2);
    expect(res.body.properties.WARD).toBe("Ward 3");
  });
});

// Question tests
describe('GET /api/crashes/questions/q2', () => {
  it('should return a valid answer for q2', async () => {
    const res = await request(app).get('/api/crashes/questions/q2');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('question');
    expect(res.body).toHaveProperty('answer');
  });
});

describe('GET /api/crashes/questions/q7', () => {
  it('should return a valid answer for q7', async () => {
    const res = await request(app).get('/api/crashes/questions/q7');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('question');
    expect(res.body).toHaveProperty('answer');
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});