const app = require('../src/index');
const request = require('supertest');
const pool = require('../src/db');
const bcrypt = require('bcryptjs');

describe('Auth login', () => {
  beforeEach(async () => {
    await pool.query('DELETE FROM users');
  });

  afterAll(async () => {
    await pool.end();
  });

  test('Login successful', async () => {
    const name = 'Naruto';
    const email = 'naruto@gmail.com';
    const password = 'Naruto@123';
    const hashed_password = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO users(name, email, hashed_password) VALUES($1, $2, $3)',
      [name, email, hashed_password],
    );

    const res = await request(app).post('/auth/login').send({
      email,
      password,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeDefined();
  });

  test('Should fail with wrong password', async () => {
    const name = 'Naruto';
    const email = 'naruto@gmail.com';
    let password = 'Naruto@123';
    const hashed_password = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO users(name, email, hashed_password) VALUES($1, $2, $3)',
      [name, email, hashed_password],
    );

    password = 'Kakakshi@123';
    const res = await request(app).post('/auth/login').send({
      email,
      password,
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.data).not.toBeDefined();
  });

  test('Should fail if user does not exist', async () => {
    const email = 'naruto@gmail.com';
    const password = 'Naruto@123';

    const res = await request(app).post('/auth/login').send({
      email,
      password,
    });

    expect(res.statusCode).toBe(404);
    expect(res.body.data).not.toBeDefined();
  });
});
