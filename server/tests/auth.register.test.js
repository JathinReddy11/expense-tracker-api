const app = require("../src/index");
const request = require("supertest");
const pool = require("../src/db");

describe("Auth register", () => {
  beforeEach(async () => {
    await pool.query("DELETE FROM users");
  });

  afterAll(async () => {
    pool.end();
  });

  test("Should register user successfully", async () => {
    let name = "Naruto";
    let email = "naruto@gmail.com";
    let password = "Naruto@123";

    const res = await request(app).post("/auth/register").send({
      name,
      email,
      password,
    });
    expect(res.statusCode).toBe(201);

    let email_results = await pool.query(
      "SELECT email FROM users WHERE email = $1",
      [email],
    );
    let rowCount = email_results.rowCount;
    expect(rowCount).toBe(1);

    let password_results = await pool.query(
      "SELECT hashed_password FROM users WHERE email = $1",
      [email],
    );
    let hashed_password = password_results.rows[0].hashed_password;

    expect(hashed_password).not.toBe(password);
  });

  test("Should not allow duplicate emails", async () => {
    let name = "Naruto";
    let email = "naruto@gmail.com";
    let password = "Naruto@123";

    let res1 = await request(app).post("/auth/register").send({
      name,
      email,
      password,
    });
    expect(res1.statusCode).toBe(201);

    let res2 = await request(app).post("/auth/register").send({
      name,
      email,
      password,
    });
    expect(res2.statusCode).toBe(409);

    let email_results = await pool.query(
      "SELECT email FROM users WHERE email = $1",
      [email],
    );
    let rowCount = email_results.rowCount;

    expect(rowCount).toBe(1);
  });
});
