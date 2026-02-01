const pool = require('../../db');

async function addUser(name, email, hashed_password) {
  return await pool.query('INSERT INTO users(name, email, hashed_password) VALUES ($1, $2, $3)', [
    name,
    email,
    hashed_password,
  ]);
}

async function getUserByEmail(email) {
  const user = await pool.query('SELECT user_id, hashed_password FROM users WHERE email = ($1)', [
    email,
  ]);
  return user.rows[0];
}

async function updateUser(user_id, name, email, hashed_password) {
  return await pool.query(
    'UPDATE users SET name=COALESCE($2, name), email=COALESCE($3, email), hashed_password=COALESCE($4, hashed_password) WHERE user_id = ($1)',
    [user_id, name, email, hashed_password]
  );
}

async function deleteUser(user_id) {
  return await pool.query('DELETE FROM users WHERE user_id = $1', [user_id]);
}

module.exports = {
  addUser,
  getUserByEmail,
  updateUser,
  deleteUser,
};
