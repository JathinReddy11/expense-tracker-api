const pool = require("../../db");

async function isCategoryOwnedByUser(user_id, category_id) {
  return await pool.query(
    "SELECT FROM categories WHERE user_id = ($1) AND category_id = ($2)",
    [user_id, category_id],
  );
}

async function insertExpense(
  user_id,
  category_id,
  amount,
  description,
  expense_date,
) {
  if (!expense_date) {
    return pool.query(
      `INSERT INTO expenses (user_id, category_id, amount, description)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [user_id, category_id, amount, description],
    );
  }

  return pool.query(
    `INSERT INTO expenses 
     (user_id, category_id, amount, description, expense_date)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [user_id, category_id, amount, description, expense_date],
  );
}

async function listExpenses(
  user_id,
  category_id,
  startDate,
  endDate,
  sortBy,
  order,
  page_number,
  limit,
) {
  let query = `SELECT expense_id, e.category_id, c.name, amount, TO_CHAR(e.expense_date, 'YYYY-MM-DD') AS expense_date, description FROM expenses e
    INNER JOIN categories c ON c.category_id =  e.category_id `;

  let conditions = [];
  let values = [];

  if (user_id) {
    conditions.push(`e.user_id = $${values.length + 1}`);
    values.push(user_id);
  }

  if (category_id) {
    const results = await isCategoryOwnedByUser(user_id, category_id);
    if (results.rowCount === 0) {
      throw new Error("RESOURCE_NOT_FOUND");
    }
    conditions.push(`e.category_id = $${values.length + 1}`);
    values.push(category_id);
  }

  if (startDate) {
    conditions.push(`e.expense_date >= $${values.length + 1}`);
    values.push(startDate);
  }

  if (endDate) {
    conditions.push(`e.expense_date <= $${values.length + 1}`);
    values.push(endDate);
  }

  if (conditions.length > 0) {
    query += "WHERE " + conditions.join(" AND ");
  }

  sortBy
    ? (query += `ORDER BY e.${sortBy} `)
    : (query += `ORDER BY e.expense_date `);
  order ? (query += `${order}`) : (query += "DESC");

  const total_list = await pool.query(query, values);

  if (page_number && limit) {
    query += ` OFFSET $${values.length + 1} LIMIT $${values.length + 2}`;
    const offset = (page_number - 1) * limit;
    values.push(offset, limit);
  }

  const expense_results = await pool.query(query, values);
  return { count: total_list.rowCount, expense_results };
}

async function changeExpense(
  expense_id,
  category_id,
  amount,
  description,
  user_id,
  expense_date,
) {
  return await pool.query(
    `UPDATE expenses SET category_id = COALESCE($2, category_id), amount = COALESCE($3, amount), description = COALESCE($4, description),
     expense_date =COALESCE($6, expense_date) WHERE user_id= ($5) AND expense_id = ($1) RETURNING *`,
    [expense_id, category_id, amount, description, user_id, expense_date],
  );
}

async function removeExpense(user_id, expense_id) {
  return await pool.query(
    "DELETE FROM expenses WHERE user_id = ($1) AND expense_id = ($2)",
    [user_id, expense_id],
  );
}

module.exports = {
  isCategoryOwnedByUser,
  insertExpense,
  listExpenses,
  changeExpense,
  removeExpense,
};
