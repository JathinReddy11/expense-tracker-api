const app = require('../src/index');
const request = require('supertest');
const pool = require('../src/db');
const bcrypt = require('bcryptjs');

describe('Create Expense', () => {
  beforeEach(async () => {
    await pool.query('DELETE FROM users');
  });
  afterAll(async () => {
    await pool.end();
  });

  test('Creating an expense successfully', async () => {
    const name = 'Naruto';
    const email = 'naruto@gmail.com';
    const password = 'Naruto@123';
    const hashed_password = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO users(name, email, hashed_password) VALUES($1, $2, $3)',
      [name, email, hashed_password],
    );

    const results = await pool.query(
      'SELECT user_id FROM users WHERE email = $1',
      [email],
    );
    const user_id = results.rows[0].user_id;

    await pool.query('INSERT INTO categories(user_id, name) VALUES($1, $2)', [
      user_id,
      'Entertainment',
    ]);

    const results2 = await pool.query(
      'SELECT category_id FROM categories WHERE user_id = $1',
      [user_id],
    );
    const category_id = results2.rows[0].category_id;

    const res1 = await request(app).post('/auth/login').send({
      email,
      password,
    });
    const token = res1.body.data;
    expect(token).toBeDefined();

    const res2 = await request(app)
      .post('/expense/expenses')
      .set('Authorization', `Bearer ${token}`)
      .send({
        category_id,
        amount: 200,
        description: 'OTT and Movie expense',
        expense_date: '2025-12-28',
      });

    expect(res2.statusCode).toBe(201);
    expect(res2.body.data).toBeDefined();
  });

  test('should fail without authentication', async () => {
    const name = 'Naruto';
    const email = 'naruto@gmail.com';
    const password = 'Naruto@123';
    const hashed_password = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO users(name, email, hashed_password) VALUES($1, $2, $3)',
      [name, email, hashed_password],
    );

    const results = await pool.query(
      'SELECT user_id FROM users WHERE email = $1',
      [email],
    );
    const user_id = results.rows[0].user_id;

    await pool.query('INSERT INTO categories(user_id, name) VALUES($1, $2)', [
      user_id,
      'Entertainment',
    ]);

    const results2 = await pool.query(
      'SELECT category_id FROM categories WHERE user_id = $1',
      [user_id],
    );
    const category_id = results2.rows[0].category_id;

    const res2 = await request(app).post('/expense/expenses').send({
      category_id,
      amount: 200,
      description: 'OTT and Movie expense',
      expense_date: '2025-12-28',
    });
    expect(res2.statusCode).toBe(401);

    const results_3 = await pool.query(
      'SELECT * FROM expenses WHERE category_id = $1',
      [category_id],
    );

    expect(results_3.rowCount).toBe(0);
  });

  test('should fail when required fields are missing', async () => {
    const name = 'Naruto';
    const email = 'naruto@gmail.com';
    const password = 'Naruto@123';
    const hashed_password = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO users(name, email, hashed_password) VALUES($1, $2, $3)',
      [name, email, hashed_password],
    );

    const results = await pool.query(
      'SELECT user_id FROM users WHERE email = $1',
      [email],
    );
    const user_id = results.rows[0].user_id;

    await pool.query('INSERT INTO categories(user_id, name) VALUES($1, $2)', [
      user_id,
      'Entertainment',
    ]);

    const results2 = await pool.query(
      'SELECT category_id FROM categories WHERE user_id = $1',
      [user_id],
    );
    const category_id = results2.rows[0].category_id;

    const res1 = await request(app).post('/auth/login').send({
      email,
      password,
    });
    const token = res1.body.data;
    expect(token).toBeDefined();

    const res2 = await request(app)
      .post('/expense/expenses')
      .set('Authorization', `Bearer ${token}`)
      .send({
        category_id,
        description: 'OTT and Movie expense',
        expense_date: '2025-12-28',
      });
    expect(res2.statusCode).toBe(400);

    const results_3 = await pool.query(
      'SELECT * FROM expenses WHERE category_id = $1',
      [category_id],
    );

    expect(results_3.rowCount).toBe(0);
  });
});
