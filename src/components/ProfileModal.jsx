import React, { useState } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";

export default function ProfileModal({ open, onClose, profile, setProfile }) {
  const [form, setForm] = useState(profile);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    setProfile(form);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ width: 400, bgcolor: "background.paper", p: 3, mx: "auto", mt: 10, borderRadius: 2 }}>
        <TextField label="Nom" name="nom" value={form.nom} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Prénom" name="prenom" value={form.prenom} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth margin="normal" />

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button variant="outlined" onClick={onClose}>
            Annuler
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Sauvegarder
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
