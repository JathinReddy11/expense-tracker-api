import ExpenseForm from "../../components/ExpenseForm";
import { createExpense } from "../../services/expense.service";
import { useEffect, useState } from "react";
import { getCategories } from "../../services/category.service";
import { useNavigate } from "react-router-dom";

export default function AddExpense() {
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      setError("");
      try {
        const categories_data = await getCategories();
        setCategories(categories_data.categories);
      } catch (err) {
        setError("Something went wrong while fetching categories");
      }
    };
    fetchCategories();
  }, []);

  const handleCreateExpense = async (formData) => {
    await createExpense(formData);
    navigate("/expenses");
  };

  return (
    <div>
      <h1>AddExpense Page</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <ExpenseForm
          onSubmit={handleCreateExpense}
          submitLabel="Add Expense"
          categories={categories}
        />
      )}
    </div>
  );
}
