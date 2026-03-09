import api from "./api";

export async function getCategories() {
  const response = await api.get("/category/categories");
  return response.data.data;
}

export async function createCategory(categoryData) {
  const response = await api.post("/category/categories", categoryData);
  return response.data;
}

export async function updateCategory(id, categoryData) {
  const response = await api.patch(`/category/categories/${id}`, categoryData);
  return response.data;
}

export async function deleteCategory(id) {
  const response = await api.delete(`/category/categories/${id}`);
  return response.data;
}
