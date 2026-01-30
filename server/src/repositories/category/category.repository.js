const pool = require("../../db");

async function addCategory(user_id, name) {
  return await pool.query(
    "INSERT INTO categories(user_id, name) VALUES($1, $2)",
    [user_id, name],
  );
}

async function listCategories(user_id, page_number = 1, limit = 10) {
  const results = await pool.query(
    "SELECT category_id, name, created_at FROM categories WHERE user_id = ($1) OFFSET (($2)-1)*($3) LIMIT ($3)",
    [user_id, page_number, limit],
  );

  const total_count = await pool.query(
    "SELECT COUNT(*) FROM categories WHERE user_id = ($1)",
    [user_id],
  );

  return { results, total_count: Number(total_count.rows[0].count) };
}

async function renameCategory(user_id, category_id, name) {
  return await pool.query(
    "UPDATE categories SET name = ($1) WHERE user_id = ($2) AND category_id = ($3) RETURNING *",
    [name, user_id, category_id],
  );
}

async function categoryDelete(user_id, category_id) {
  return await pool.query(
    "DELETE FROM categories WHERE user_id = ($1) AND category_id = ($2)",
    [user_id, category_id],
  );
}

module.exports = {
  addCategory,
  listCategories,
  renameCategory,
  categoryDelete,
};
