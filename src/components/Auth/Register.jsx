import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { register } from "../Services/api";

const Register = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [tscNumber, setTscNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ name, email, tscNumber, password });
      setSuccess(true);
      alert("Registration successful! Please login.");
      window.location.href = "/login"; // Redirect to login page
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
          <div className="password-input-conatiner">
            <input
              type={showPassword ? "text" : "password"} // Toggle between text and password
              id="password"
              placeholder=" Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
              {/* Toggle eye icon */}
            </span>
          </div>
        </div>
      </form>
      <div className="social-login">
        <p>or sign in with</p>
        <button className="google-button">Continue with Google</button>
      </div>
      <div className="create-account">
        <p>Create an account</p>
      </div>
    </div>
  );
};

export default Register;
