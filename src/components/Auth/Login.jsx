import { login } from "../Services/api";
import { saveToken } from "../Services/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState } from "react";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  Paper,
  Box
} from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [tscNumber, setTscNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [error, setError] = useState(null);
  const [tscError, setTscError] = useState(""); // Error message for TSC Number

  const validateTscNumber = (value) => {
    if (!/^\d+$/.test(value)) {
      return "TSC Number must be numeric";
    }
    if (value.length < 6) {
      return "TSC Number must be at least 6 digits";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const tscValidationMessage = validateTscNumber(tscNumber);
    if (tscValidationMessage) {
      setTscError(tscValidationMessage);
      return;
    }

    try {
      const response = await login({ email, tsc_number: tscNumber, password });
      saveToken(response.data.token);

      const userRole = response.data.role;
      window.location.href =
        userRole === "admin" ? "/admin/dashboard" : "/user/dashboard";
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={3} sx={{ p: 4, width: 400, textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, color: "green" }}>
          KNUT
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
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
            type="text"
            variant="outlined"
            margin="normal"
            value={tscNumber}
            onChange={(e) => {
              setTscNumber(e.target.value);
              setTscError(validateTscNumber(e.target.value)); // Validate on change
            }}
            error={!!tscError}
            helperText={tscError}
            required
          />
          <Box display="flex" alignItems="center" position="relative">
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: 10,
                cursor: "pointer",
                top: "50%",
                transform: "translateY(-50%)"
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
                color="primary"
              />
            }
            label="Keep me signed in"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, backgroundColor: "green" }}
            disabled={!!tscError} // Disable if TSC error exists
          >
            Login
          </Button>
        </form>
        <Typography variant="body2" sx={{ my: 2 }}>
          or sign in with
        </Typography>
        <Button fullWidth variant="outlined" sx={{ textTransform: "none", mb: 2 }}>
          Continue with Google
        </Button>
        <Typography variant="body2">
          Don't have an account? <a href="/register">Create one</a>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;