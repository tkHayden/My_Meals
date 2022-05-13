const supertest = require('supertest');
const http = require('http');

const testdb = require('./db');
const app = require('../app');
const query = require('../db');

let server;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen();
  request = supertest(server);
  return testdb.reset();
});

afterAll((done) => {
  server.close(done);
});

const mockLists = ['monday_list', 'superbowl',
  'weekend list', 'birthday list', 'list_1'];


describe('Inserting into grocery_list queries', () => {
  test('Inserting new grocery_lists', async () => {
    for (const list of mockLists) {
      id = Math.floor(Math.random() * 10);
      const result = await query.createGroceryList(id, list);
      expect(result[0].id).not.toBe(null);
      expect(result[0]['list_name']).toBe(list);
      expect(result[0]['user_id']).toBe(`${id}`);
    }
  });
  test('Inserting a grocery_list with same name for a user', async () => {
    const result = await query.createGroceryList(1, 'same_list');
    expect(result[0]['list_name']).toBe('same_list');
    expect(result[0]['user_id']).toBe('1');
    const dupResult = await query.createGroceryList(1, 'same_list');
    expect(dupResult).toBe(null);
  });
});
describe('Selecting from grocery_list queries', () => {
  test('Selecting all grocery list for a user', async () => {
    const result = await query.getAllGroceryLists(1);
    expect(result.length).toBeGreaterThan(0);
    for (const item of result) {
      expect(item['user_id']).toBe('1');
    }
  });
});
