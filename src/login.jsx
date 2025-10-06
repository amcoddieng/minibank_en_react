import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { loginUser, setToken, getUserRole } from "./components/api/api_lofin";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const data = await loginUser(email, password);
      setToken(data.token);

      // Récupérer le rôle depuis le token
      const role = getUserRole();

      // Redirection selon rôle
      switch (role) {
        case "agent":
          navigate("/agent/dashboard");
          break;
        case "client":
          navigate("/client/home");
          break;
        case "distributeur":
          navigate("/distributeur/home");
          break;
        default:
          navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Erreur de connexion");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f2f5",
        width:"100vw",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 3,
          width: { xs: "90%", sm: "70%", md: "400px" },
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h4" align="center" sx={{ fontWeight: "bold" }}>
          Connexion
        </Typography>

        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          label="Mot de passe"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />

        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          fullWidth
          sx={{ py: 1.5, borderRadius: 2 }}
          onClick={handleSubmit}
        >
          Connexion
        </Button>
      </Paper>
    </Box>
  );
}
