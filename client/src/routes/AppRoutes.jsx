import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

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
    path: "/",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/expenses",
    element: (
      <ProtectedRoute>
        <Expenses />
      </ProtectedRoute>
    ),
  },
  {
    path: "/expenses/add",
    element: (
      <ProtectedRoute>
        <AddExpense />
      </ProtectedRoute>
    ),
  },
  {
    path: "/expenses/edit/:expense_id",
    element: (
      <ProtectedRoute>
        <EditExpense />
      </ProtectedRoute>
    ),
  },
  {
    path: "/categories",
    element: (
      <ProtectedRoute>
        <Categories />
      </ProtectedRoute>
    ),
  },
  {
    path: "/reports",
    element: (
      <ProtectedRoute>
        <Reports />
      </ProtectedRoute>
    ),
  },
]);

export default router;
