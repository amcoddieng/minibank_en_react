import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { makeDepot } from "./api/api_depot";
import { getId } from "./api/api_lofin";

export default function Deposit() {
  const [compteDestinataire, setCompteDestinataire] = useState("");
  const [montant, setMontant] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false); // état modal
  const idCompteSource = getId(); // id de l'admin qui fait le dépôt

  const handleOpen = () => {
    setError("");
    if (!compteDestinataire || !montant) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    const montantNumber = Number(montant);
    if (montantNumber <= 0) {
      setError("Le montant doit être supérieur à zéro.");
      return;
    }
    if (montantNumber < 5000) {
      setError("Le montant minimum pour un dépôt est de 5000 f.");
      return;
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleConfirm = async () => {
    try {
      setMessage("");
      setError("");
      const res = await makeDepot({
        compteDestinataire,
        montant: Number(montant),
        idCompteSource,
      });
      setMessage(
        `Dépôt effectué avec succès : montant ${res.montantTransfere} FCFA, frais ${res.frais} FCFA, débité ${res.montantDebite} FCFA`
      );
      setCompteDestinataire("");
      setMontant("");
    } catch (err) {
      setError(err.response?.data?.error || "Erreur lors du dépôt");
    } finally {
      setOpen(false);
    }
  };

  return (
    <Box sx={{ mt: 2, p: 2, maxWidth: 400 }}>
      <TextField
        label="Compte destinataire"
        value={compteDestinataire}
        onChange={(e) => setCompteDestinataire(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Montant"
        type="number"
        value={montant}
        onChange={(e) => setMontant(e.target.value)}
        fullWidth
        margin="normal"
      />
      {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
      {message && <Typography color="primary" sx={{ mt: 1 }}>{message}</Typography>}

      <Button variant="contained" onClick={handleOpen} sx={{ mt: 2 }} fullWidth>
        Valider le dépôt
      </Button>

      {/* Modal de confirmation */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmation du dépôt</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Voulez-vous vraiment déposer <strong>{montant} FCFA</strong> sur le compte <strong>{compteDestinataire}</strong> ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Annuler
          </Button>
          <Button onClick={handleConfirm} variant="contained">
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
