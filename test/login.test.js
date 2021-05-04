/* eslint-disable no-undef */
const supertest = require('supertest');
const serveur = require('../index.js');

describe('POST /login', () => {
  describe('given an email and password', () => {
    test('should respond with a 200 status code', async () => {
      const res = await supertest(serveur).post('/login').send({
        email: 'email@gmail.com',
        password: 'password',
      });
      expect(res.json);
    });
  });

  describe('when email and password is missing', () => {
    test('should respond with a 400 status code', async () => {
      const res = await supertest(serveur).post('login').send({
        email: 'email@gmail.com',
        password: 'password',
      });
      expect(res.json);
    });
  });

  describe('when email and password are different', () => {
    test('should respond with a 401 status code', async () => {
      const res = await supertest(serveur).post('login').send({
        email: 'email@gmail.com',
        password: 'password',
      });
      expect(res.json);
    });
  });
});
