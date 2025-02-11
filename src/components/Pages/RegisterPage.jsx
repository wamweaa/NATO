import React from "react";
import Register from "../Auth/Register";
import { Box, Typography, Container } from "@mui/material";

const RegisterPage = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          textAlign: "center",
          mt: 5,
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: "white",
        }}
      >
        <Typography variant="h5" color="green" fontWeight="bold" gutterBottom>
          Welcome to KNUT Financial Management System
        </Typography>
        <Register />
      </Box>
    </Container>
  );
};

export default RegisterPage;
