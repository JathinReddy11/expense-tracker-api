import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import ProtectedLayout from "../layouts/ProtectedLayout";

// Auth pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Dashboard
import Dashboard from "../pages/dashboard/Dashboard";

// Expenses
import Expenses from "../pages/expenses/Expenses";
import AddExpense from "../pages/expenses/AddExpense";
import EditExpense from "../pages/expenses/EditExpense";

// Categories
import Categories from "../pages/categories/Categories";

// Reports
import Reports from "../pages/reports/Reports";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <ProtectedLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/expenses", element: <Expenses /> },
      { path: "/expenses/add", element: <AddExpense /> },
      { path: "/expenses/edit/:expense_id", element: <EditExpense /> },
      { path: "/categories", element: <Categories /> },
      { path: "/reports", element: <Reports /> },
      { index: true, element: <Dashboard /> },
    ],
  },
]);

export default router;
