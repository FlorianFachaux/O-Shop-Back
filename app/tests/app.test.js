const request = require('supertest');
const app = require('../app');

describe('Articles and category route (GET)', () => {
  // route articles
  it('Articles should respond a status 200', async () => {
    const response = await request(app).get('/articles');
    expect(response.status).toEqual(200);
  });

  it('Articles should return a json', async () => {
    const response = await request(app).get('/articles');
    expect(response.headers['content-type']).toMatch(/json/);
  });

  it('Articles should be defined', async () => {
    const response = await request(app).get('/articles');
    expect(response.body).not.toBeUndefined();
  });

  // route categories
  it('Categories should respond a status 200', async () => {
    const response = await request(app).get('/categories');
    expect(response.status).toEqual(200);
  });

  it('Categories should return a json', async () => {
    const response = await request(app).get('/categories');
    expect(response.headers['content-type']).toMatch(/json/);
  });

  it('Categories should be defined', async () => {
    const response = await request(app).get('/categories');
    expect(response.body).not.toBeUndefined();
  });

});
