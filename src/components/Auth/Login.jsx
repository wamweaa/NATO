import { login } from "../Services/api";
import { saveToken } from "../Services/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [tscNumber, setTscNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // show password
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, tscNumber, password });
      saveToken(response.data.token); // Save the token to localStorage

      const userRole = response.data.role; // Assuming the API response includes the user role
      if (userRole === "admin") {
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/user/dashboard";
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <h1>KNUT</h1>
      {error && <p className="error">{error}</p>}
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
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={keepSignedIn}
              onChange={(e) => setKeepSignedIn(e.target.checked)}
            />{" "}
            Keep me signed in
          </label>
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
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

export default Login;
