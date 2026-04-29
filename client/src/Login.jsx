import { useState } from "react";

const API_BASE_URL = "http://localhost:4000/api/players";

function Login({ onLogin }) {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
  });

  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  function validateField(name, value) {
    let error = "";

    if (name === "name" && value.trim() === "") error = "Name Required";
    if (name === "email" && !value.includes("@")) error = "Invalid Email";
    if (name === "phone" && value.length !== 10) error = "10-digit required";
    if (name === "category" && value === "") error = "Select category";

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFields({ ...fields, [name]: value });
    validateField(name, value);
  }

  function validate() {
    let valid = true;

    Object.keys(fields).forEach((key) => {
      const err = validateField(key, fields[key]);
      if (err) valid = false;
    });

    return valid;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) {
      setLoginError("Fix errors before submitting");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/${fields.name}`);

      if (res.ok) {
        const player = await res.json();
        onLogin(player);
        return;
      }

      if (res.status === 404) {
        const create = await fetch(API_BASE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fields),
        });

        const newPlayer = await create.json();
        onLogin(newPlayer);
        return;
      }

    } catch (err) {
      setLoginError("Login failed");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
    <h2>Welcome to Hangman Game</h2>
      <h2>Signup / Login</h2>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <p style={{ color: "red" }}>{errors.name}</p>

      <input name="email" placeholder="Email" onChange={handleChange} />
      <p style={{ color: "red" }}>{errors.email}</p>

      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <p style={{ color: "red" }}>{errors.phone}</p>

      <select name="category" onChange={handleChange}>
        <option value="">Select</option>
        <option value="sports">Student</option>
        <option value="music">Dreamer</option>
        <option value="tech">Tech</option>
      </select>
      <p style={{ color: "red" }}>{errors.category}</p>

      <button type="submit">Enter Game</button>

      {loginError && <p style={{ color: "red" }}>{loginError}</p>}
    </form>
  );
}

export default Login;