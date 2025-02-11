import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { register } from "../Services/api"; // Ensure this function correctly makes a POST request

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tscNumber, setTscNumber] = useState(""); // Correct field name used in payload
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state before submission

    try {
      // Send request with correct field names
      const response = await register({
        name,
        email,
        tsc_number: tscNumber, // Ensure this matches the backend field
        password,
      });

      if (response.message === "User registered successfully!") {
        setSuccess(true);
        alert("Registration successful! Please login.");
        window.location.href = "/login"; // Redirect to login page
      } else {
        setError(response.message || "Unexpected response from the server.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-container">
      <h1>Register</h1>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">Registration successful!</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="johndoe@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tsc">TSC Number</label>
          <input
            type="text"
            id="tsc"
            placeholder="47664544"
            value={tscNumber}
            onChange={(e) => setTscNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group password-group">
          <label htmlFor="password">Password</label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
