import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { cancelTransaction } from "./api/cancelTransaction";

export default function CancelTransaction() {
  const [idTransaction, setIdTransaction] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false); // état modal

  const handleOpen = () => {
    if (!idTransaction) {
      setError("Veuillez entrer l'ID de la transaction.");
      return;
    }
    setError("");
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleConfirm = async () => {
    try {
      setMessage("");
      const res = await cancelTransaction(idTransaction);
      setMessage(res.message || "Transaction annulée avec succès.");
    } catch (err) {
      setError(err.response?.data?.error || "Erreur lors de l'annulation.");
    } finally {
      setOpen(false);
    }
  };

  return (
    <Box sx={{ p: 2, maxWidth: 500, margin: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Annuler une transaction
      </Typography>
      <TextField
        label="ID de la transaction"
        value={idTransaction}
        onChange={(e) => setIdTransaction(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="error"
        onClick={handleOpen}
        fullWidth
      >
        Annuler la transaction
      </Button>

      {/* ✅ Modal de confirmation */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Voulez-vous vraiment annuler la transaction avec l'ID{" "}
            <strong>{idTransaction}</strong> ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Annuler
          </Button>
          <Button onClick={handleConfirm} color="error" variant="contained">
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>

      {message && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {message}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
}
