import { useState } from "react";

function Form() {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
    category: ""
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;

    setFields({
      ...fields,
      [name]: value
    });

    validateField(name, value);
  }

  function validateField(name, value) {
    let error = "";

    if (name === "name" && value.trim() === "") {
      error = "Name required";
    }

    if (name === "email" && !value.includes("@")) {
      error = "Invalid email";
    }

    if (name === "phone" && value.length !== 10) {
      error = "10-digit phone required";
    }

    setErrors({
      ...errors,
      [name]: error
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log("Form submitted:", fields);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup Form</h2>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <p style={{ color: "red" }}>{errors.name}</p>

      <input name="email" placeholder="Email" onChange={handleChange} />
      <p style={{ color: "red" }}>{errors.email}</p>

      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <p style={{ color: "red" }}>{errors.phone}</p>

      

      <br /><br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;