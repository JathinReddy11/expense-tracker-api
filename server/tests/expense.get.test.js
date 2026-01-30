const app = require("../src/index");
const request = require("supertest");
const pool = require("../src/db");
const bcrypt = require("bcryptjs");

describe("Get expenses list", () => {
  beforeEach(async () => {
    await pool.query("DELETE FROM users");
  });

  afterAll(async () => {
    await pool.end();
  });

  test("getting expenses successfully", async () => {
    const name = "Naruto";
    const email = "naruto@gmail.com";
    const password = "Naruto@123";
    const hashed_password = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users(name, email, hashed_password) VALUES($1, $2, $3)",
      [name, email, hashed_password],
    );

    const another_password = await bcrypt.hash("Kakashi@123", 10);
    await pool.query(
      `INSERT INTO users(name, email, hashed_password) VALUES('Kakashi', 'kakashi@gmail.com', $1)`,
      [another_password],
    );

    const first_user = await pool.query(
      "SELECT user_id FROM users WHERE email=$1",
      [email],
    );
    const first_user_id = first_user.rows[0].user_id;

    const second_user = await pool.query(
      `SELECT user_id FROM users WHERE email='kakashi@gmail.com'`,
    );
    const second_user_id = second_user.rows[0].user_id;

    await pool.query("INSERT INTO categories(user_id, name) VALUES($1, $2)", [
      first_user_id,
      "Entertainment",
    ]);

    const category_id_results = await pool.query(
      "SELECT category_id FROM categories WHERE user_id = $1",
      [first_user_id],
    );
    const category_id = category_id_results.rows[0].category_id;

    await pool.query("INSERT INTO categories(user_id, name) VALUES($1, $2)", [
      second_user_id,
      "Entertainment",
    ]);

    const category_id_results2 = await pool.query(
      "SELECT category_id FROM categories WHERE user_id = $1",
      [second_user_id],
    );
    const category_id2 = category_id_results2.rows[0].category_id;

    await pool.query(
      "INSERT INTO expenses(user_id, category_id, amount, description, expense_date) VALUES($1, $2, $3, $4, $5)",
      [first_user_id, category_id, 200, "OTT and movie expense", "2025-12-28"],
    );

    await pool.query(
      "INSERT INTO expenses(user_id, category_id, amount, description, expense_date) VALUES($1, $2, $3, $4, $5)",
      [second_user_id, category_id2, 200, "TV show expense", "2025-12-28"],
    );

    const res1 = await request(app).post("/auth/login").send({
      email,
      password,
    });
    const token = res1.body.data;
    expect(token).toBeDefined();

    const res2 = await request(app)
      .get("/expense/expenses")
      .set("authorization", `Bearer ${token}`);
    expect(res2.statusCode).toBe(200);

    const get_results = await pool.query(
      `SELECT expense_id, e.category_id, c.name, amount, TO_CHAR(e.expense_date, 'YYYY-MM-DD') AS expense_date, description FROM expenses e
    INNER JOIN categories c ON c.category_id =  e.category_id WHERE e.user_id = $1`,
      [first_user_id],
    );

    expect(res2.body.data.expenses[0]).toEqual(get_results.rows[0]);
  });
});
