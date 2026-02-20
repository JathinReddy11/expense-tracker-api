import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">Dashboard</Link>| <Link to="/expenses">Expenses</Link>|{" "}
      <Link to="/expenses/add">Add expense</Link>|{"  "}
      <Link to="/categories">Categories</Link>|{" "}
      <Link to="/reports">Reports</Link>|{" "}
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}
