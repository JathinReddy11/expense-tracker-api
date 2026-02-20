import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/auth.service";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await loginUser(formData);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h2>Login form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <br />
        <br />

        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
        <br />
        <br />

        <button type="submit">Login</button>
      </form>
      <br />

      <button onClick={() => navigate("/register")}>Sign up</button>

      {error && <p>{error}</p>}
    </div>
  );
}
