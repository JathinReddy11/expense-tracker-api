import { useState, useEffect } from "react";

let defaultForm = {
  category_id: "",
  amount: "",
  description: "",
  expense_date: "",
};

export default function ExpenseForm({
  initialValues = defaultForm,
  onSubmit,
  submitLabel,
  categories = [],
}) {
  console.log(initialValues);
  const [form, setForm] = useState(defaultForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setForm(initialValues || defaultForm);
  }, [initialValues]);

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await onSubmit(form);
    } catch (err) {
      console.error("Failed to Add expense", err);
      setError("Something went wrong while adding expense");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}

      <label htmlFor="description">Expense Name: </label>
      <textarea
        id="description"
        name="description"
        placeholder="description"
        value={form.description}
        onChange={handleChange}
        required
      />

      <label htmlFor="amount">Amount: </label>
      <input
        type="number"
        id="amount"
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        required
      />

      <label htmlFor="expense_date">Date: </label>
      <input
        type="date"
        id="expense_date"
        name="expense_date"
        value={form.expense_date}
        onChange={handleChange}
        required
      />

      <select
        name="category_id"
        value={form.category_id}
        onChange={handleChange}
        required
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option value={category.category_id} key={category.category_id}>
            {category.name}
          </option>
        ))}
      </select>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
