const pool = require("../../db");

async function getMonthlyTotalByUser(user_id, start_date, end_date) {
  const result = await pool.query(
    `SELECT COALESCE(SUM(amount), 0) AS total FROM expenses 
    WHERE user_id = $1 AND expense_date >= $2 AND expense_date < $3`,
    [user_id, start_date, end_date],
  );
  return result.rows[0].total;
}

async function getYearlyTotalByUser(user_id, start_date, end_date) {
  const result = await pool.query(
    `SELECT EXTRACT(MONTH FROM expense_date) AS Month, SUM(amount) AS total FROM expenses 
    WHERE user_id = $1 AND expense_date >= $2 AND expense_date <= $3
    GROUP BY Month ORDER BY Month`,
    [user_id, start_date, end_date],
  );
  return result;
}

async function getCategoryWiseSummaryByUser(user_id, start_date, end_date) {
  const results = await pool.query(
    `SELECT COALESCE(SUM(amount), 0) as total_amount FROM expenses WHERE user_id = $1  AND expense_date >= $2
       AND expense_date <= $3`,
    [user_id, start_date, end_date],
  );
  const total = Number(results.rows[0].total_amount);

  const category_results = await pool.query(
    `SELECT e.category_id, c.name as category_name, SUM(e.amount) as total_amount,
     ROUND((SUM(e.amount)/NULLIF($4::numeric, 0))*100, 2) as percentage
    FROM expenses e
    INNER JOIN categories c ON c.category_id = e.category_id
    WHERE e.user_id = $1
     AND e.expense_date >= $2
     AND e.expense_date <= $3
    GROUP BY e.category_id, c.name
    ORDER BY total_amount DESC`,
    [user_id, start_date, end_date, total],
  );
  return { total, category_results };
}

module.exports = {
  getMonthlyTotalByUser,
  getYearlyTotalByUser,
  getCategoryWiseSummaryByUser,
};
