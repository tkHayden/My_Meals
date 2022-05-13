const supertest = require('supertest');
const http = require('http');

const db = require('./db');
const app = require('../app');
const tdb = require('../db');

let server;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen();
  request = supertest(server);
  return db.reset();
});

afterAll((done) => {
  server.close(done);
});


describe('Testing endpoint to request another verification email', () => {
  test('Non-existent email rerification email', async () => {
    const result = await tdb.getAllGroceryLists(1);
    console.log(result);
    expect(result).toBe(null);
  });
});
