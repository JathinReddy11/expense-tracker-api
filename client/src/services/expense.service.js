import api from "./api";

export async function getExpenses(query) {
  const response = await api.get("/expense/expenses", {
    params: {
      page_number: query.page,
      limit: query.limit,
      sortBy: query.sortBy,
      order: query.order,
      startDate: query.startDate,
      endDate: query.endDate,
      category_id: query.category_id,
      expense_id: query.expense_id,
    },
  });
  return response.data.data;
}

export async function createExpense(expenseData) {
  const response = await api.post("/expense/expenses", expenseData);
  return response.data;
}

export async function updateExpense(id, expenseData) {
  const response = await api.patch(`/expense/expenses/${id}`, expenseData);
  return response.data;
}

export async function deleteExpense(id) {
  const response = await api.delete(`/expense/expenses/${id}`);
  return response.data;
}
