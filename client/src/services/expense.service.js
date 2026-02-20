import api from "./api";

export async function getExpenses() {
  const response = await api.get("/expense/expenses");
  return response.data;
}

export async function createExpense(expenseData) {
  const response = await api.post("/expense/expenses", expenseData);
  return response.data;
}

export async function updataExpense(id, expenseData) {
  const response = await api.patch(`/expense/expenses/${id}`, expenseData);
  return response.data;
}

export async function deleteExpense(id) {
  const response = await api.delete(`/expense/expenses/${id}`);
  return response.data;
}
