const {
  listExpenses,
} = require(".././repositories/expense/expense.repository");

async function getReportCsv(
  user_id,
  category_id,
  startDate,
  endDate,
  sortBy,
  order,
) {
  const { expense_results } = await listExpenses(
    user_id,
    category_id,
    startDate,
    endDate,
    sortBy,
    order,
  );

  const total_rows = expense_results.rows;
  if (total_rows.length === 0) {
    return "";
  }

  let result = "";

  let headers = Object.keys(total_rows[0]).join(",") + "\n";
  result += headers;

  total_rows.forEach((row) => {
    result += Object.values(row).join(",") + "\n";
  });
  result = result.slice(0, -1);

  return result;
}

module.exports = { getReportCsv };
