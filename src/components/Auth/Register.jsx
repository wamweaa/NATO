import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { register } from "../Services/api";
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  IconButton, 
  InputAdornment 
} from "@mui/material";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tscNumber, setTscNumber] = useState(""); // Holds TSC Number
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await register({
        name,
        email,
        tsc_number: tscNumber, // Match backend field name
        password,
      });

      if (response.message === "User registered successfully!") {
        setSuccess(true);
        alert("Registration successful! Please login.");
        window.location.href = "/login";
      } else {
        setError(response.message || "Unexpected response from the server.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <Box 
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 5,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "white"
      }}
    >
      <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
        Register
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      {success && (
        <Typography color="success.main" sx={{ mb: 2 }}>
          Registration successful!
        </Typography>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Full Name"
          variant="outlined"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Email Address"
          type="email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="TSC Number"
          variant="outlined"
          margin="normal"
          value={tscNumber}
          onChange={(e) => setTscNumber(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{ mt: 2, bgcolor: "green", color: "white" }}
        >
          Register
        </Button>
        <Typography sx={{ mt: 2, textAlign: "center" }}>
          Already have an account? <a href="/login">Login</a>
        </Typography>
      </form>
    </Box>
  );
};

export default Register;