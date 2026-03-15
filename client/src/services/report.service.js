import api from "./api";

export async function getMonthlyTotal(year, month) {
  const response = await api.get("/reports/monthly-total", {
    params: { year, month },
  });
  return response.data;
}

export async function getYearlyTotal(year) {
  const response = await api.get("/reports/yearly-total", {
    params: { year },
  });
  return response.data;
}

export async function getCategorySummary(start_date, end_date) {
  const response = await api.get("/reports/category-summary", {
    params: { start_date, end_date },
  });
  return response.data;
}
