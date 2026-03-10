import { useState, useEffect } from "react";
import { getExpenses, deleteExpense } from "../../services/expense.service";
import { getCategories } from "../../services/category.service";
import { useNavigate } from "react-router-dom";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    sortBy: "expense_date",
    order: "DESC",
  });
  const [totalPages, setTotalPages] = useState(1);
  const [startDateInput, setStartDateInput] = useState("");
  const [endDateInput, setEndDateInput] = useState("");
  const [dateError, setDateError] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [expenseId, setExpenseId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getExpenses(query);
        setExpenses(data.expenses);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error("Failed to fetch expenses", err);
        setError("Something went wrong while fetching expenses");
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, [query]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories_data = await getCategories();
        setCategories(categories_data.categories);
      } catch (err) {
        setError("Something went wrong while fetching expenses");
      }
    };
    fetchCategories();
  }, []);

  const handleApply = () => {
    if (startDateInput && endDateInput && startDateInput > endDateInput) {
      setDateError("start Date must be less than end Date");
      return;
    }

    setDateError("");

    setQuery((prev) => ({
      ...prev,
      startDate: startDateInput || undefined,
      endDate: endDateInput || undefined,
      category_id: categoryInput || undefined,
      page: 1,
    }));
  };

  const handleEdit = (expense_id) => {
    navigate(`/expenses/edit/${expense_id}`);
  };

  const openDialog = (expense_id) => {
    setExpenseId(expense_id);
    document.getElementById("myDialog").showModal();
  };

  const handleConfirmCancel = () => {
    document.getElementById("myDialog").close();
    setExpenseId(null);
  };

  const handleConfirmDelete = async () => {
    try {
      setDeleting(true);

      await deleteExpense(expenseId);
      setExpenseId(null);

      setQuery((prev) => ({ ...prev }));

      document.getElementById("myDialog").close();
    } catch (err) {
      setError("Something went wrong while deleting expense");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <h1>Expenses Page</h1>
      <select
        value={query.sortBy}
        onChange={(e) =>
          setQuery((prev) => ({
            ...prev,
            sortBy: e.target.value,
            page: 1,
          }))
        }
      >
        <option value="expense_date">Date</option>
        <option value="amount">Amount</option>
      </select>
      <select
        value={query.order}
        onChange={(e) =>
          setQuery((prev) => ({
            ...prev,
            order: e.target.value,
            page: 1,
          }))
        }
      >
        <option value="DESC">DESC</option>
        <option value="ASC">ASC</option>
      </select>
      <label htmlFor="startDate">Start Date:</label>
      <input
        type="date"
        id="startDate"
        value={startDateInput}
        onChange={(e) => setStartDateInput(e.target.value)}
      />
      <label htmlFor="endDate">End Date:</label>
      <input
        type="date"
        id="endDate"
        value={endDateInput}
        onChange={(e) => setEndDateInput(e.target.value)}
      />
      {dateError && <p>{dateError}</p>}
      <br />
      <br />
      <select
        value={categoryInput}
        onChange={(e) => setCategoryInput(e.target.value)}
      >
        <option value="">All</option>
        {categories.map((category) => {
          return (
            <option key={category.category_id} value={category.category_id}>
              {category.name}
            </option>
          );
        })}
      </select>
      <button
        disabled={
          startDateInput && endDateInput && startDateInput > endDateInput
        }
        onClick={handleApply}
      >
        Apply
      </button>
      {loading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      {!loading &&
        !error &&
        (expenses.length === 0 ? (
          <h2>No expenses found....</h2>
        ) : (
          <ul>
            {expenses.map((expense) => (
              <li key={expense.expense_id}>
                {expense.expense_date} - {expense.description} -{" "}
                {expense.amount}
                <button onClick={() => handleEdit(expense.expense_id)}>
                  Edit
                </button>
                <button onClick={() => openDialog(expense.expense_id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ))}
      {totalPages != 0 && (
        <div>
          {" "}
          <button
            disabled={query.page === 1}
            onClick={() =>
              setQuery((prev) => ({ ...prev, page: prev.page - 1 }))
            }
          >
            prev
          </button>
          <span>
            {query.page} of {totalPages}
          </span>
          <button
            disabled={query.page === totalPages}
            onClick={() =>
              setQuery((next) => ({ ...next, page: next.page + 1 }))
            }
          >
            next
          </button>{" "}
        </div>
      )}
      <dialog id="myDialog">
        <p>This expense will be permanently deleted. Are you sure?</p>

        <br />

        <button onClick={handleConfirmDelete} disabled={deleting}>
          {deleting ? "Deleting..." : "Confirm Delete"}
        </button>
        <button onClick={handleConfirmCancel}>Cancel</button>
      </dialog>
      ;
    </div>
  );
}
