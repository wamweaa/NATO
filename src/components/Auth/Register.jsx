import React, { useState } from 'react';
import { register } from '../Services/api';

const Register = () => {
    const [name, setname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await register({ name, email, password });
        setSuccess(true);
        alert('Registration successful! Please login.');
        window.location.href = '/login'; // Redirect to login page
      } catch (err) {
        setError(err.response?.data?.message || 'Registration failed. Please try again.');
      }
    };
  
    return (
      <div className="auth-container">
        <h1>Register</h1>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">Registration successful!</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setname(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  };
  

export default Register;
