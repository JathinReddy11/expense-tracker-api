const app = require('../src/index');
const request = require('supertest');
const pool = require('../src/db');

describe('Auth register', () => {
  beforeEach(async () => {
    await pool.query('DELETE FROM users');
  });

  afterAll(async () => {
    pool.end();
  });

  test('Should register user successfully', async () => {
    const name = 'Naruto';
    const email = 'naruto@gmail.com';
    const password = 'Naruto@123';

    const res = await request(app).post('/auth/register').send({
      name,
      email,
      password,
    });
    expect(res.statusCode).toBe(201);

    const email_results = await pool.query(
      'SELECT email FROM users WHERE email = $1',
      [email],
    );
    const rowCount = email_results.rowCount;
    expect(rowCount).toBe(1);

    const password_results = await pool.query(
      'SELECT hashed_password FROM users WHERE email = $1',
      [email],
    );
    const hashed_password = password_results.rows[0].hashed_password;

    expect(hashed_password).not.toBe(password);
  });

  test('Should not allow duplicate emails', async () => {
    const name = 'Naruto';
    const email = 'naruto@gmail.com';
    const password = 'Naruto@123';

    const res1 = await request(app).post('/auth/register').send({
      name,
      email,
      password,
    });
    expect(res1.statusCode).toBe(201);

    const res2 = await request(app).post('/auth/register').send({
      name,
      email,
      password,
    });
    expect(res2.statusCode).toBe(409);

    const email_results = await pool.query(
      'SELECT email FROM users WHERE email = $1',
      [email],
    );
    const rowCount = email_results.rowCount;

    expect(rowCount).toBe(1);
  });
});
