import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/auth.service";

export default function Register() {
  let [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  let [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await registerUser(formData);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="John"
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <br />

        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="John@gmail.com"
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

        <button type="submit">Register</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
}
