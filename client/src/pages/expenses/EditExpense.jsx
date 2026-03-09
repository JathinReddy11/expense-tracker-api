import ExpenseForm from "../../components/ExpenseForm";
import { updateExpense, getExpenses } from "../../services/expense.service";
import { getCategories } from "../../services/category.service";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function EditExpense() {
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [expense, setExpense] = useState(null);

  const { expense_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setError("");
      try {
        const data = await getExpenses({ expense_id });
        setExpense(data.expenses[0]);

        const categories_data = await getCategories();
        setCategories(categories_data.categories);
      } catch (err) {
        setError("Something went wrong while fetching data");
      }
    };
    fetchData();
  }, [expense_id]);

  const handleUpdateExpense = async (formData) => {
    await updateExpense(expense_id, formData);
    navigate("/expenses");
  };

  if (error) return <p>{error}</p>;
  if (!expense) return <p>Loading....</p>;

  return (
    <div>
      <h1>Edit Expense Page</h1>
      <ExpenseForm
        initialValues={{
          category_id: expense.category_id,
          amount: expense.amount,
          description: expense.description,
          expense_date: expense.expense_date,
        }}
        onSubmit={handleUpdateExpense}
        submitLabel="Update Expense"
        categories={categories}
      />
    </div>
  );
}
