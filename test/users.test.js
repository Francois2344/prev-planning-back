/* eslint-disable no-undef */
const supertest = require('supertest');
const serveur = require('../index.js');

describe('GET /', () => {
  describe('list of users', () => {
    test('should respond with a 200 status code', async () => {
      const res = await supertest(serveur).get('/').send({
        firstname: '',
        lastname: '',
      });
      expect(res.json);
    });
  });
});

describe('POST /add', () => {
  describe('give lastname and firstname', () => {
    test('should respond with a 200 status code', async () => {
      const res = await supertest(serveur).post('add').send({
        firstname: '',
        lastname: '',
      });
      expect(res.json);
    });
  });
});
